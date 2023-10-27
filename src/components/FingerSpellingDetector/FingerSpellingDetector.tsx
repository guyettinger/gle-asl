import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components"
import {
    RoboflowLoadParams,
    RoboflowModel,
    RoboflowObjectDetection,
    useRoboflowClientContext,
    RoboflowWebcam,
    RoboflowObjectDetectionCanvas
} from "gle-roboflow-components";
import { FingerSpellingSummary } from "@/components/FingerSpellingSummary/FingerSpellingSummary";
import { FingerSpellingDetectorProps } from "@/components/FingerSpellingDetector/FingerSpellingDetector.types";

const FingerSpellingDetectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1rem 0;
`

const FingerSpellingDetectorContent = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #1D1E20;
  border-radius: 4px;
`

const FingerSpellingDetectorVideoContent = styled.div`
  position: relative;
`

export const FingerSpellingDetector = ({fingerSpellingDetectionModel, fingerSpellingDetectionModelVersion}: FingerSpellingDetectorProps) => {
    const webcamRef = useRef<Webcam>(null)
    const [objectDetections, setObjectDetections] = useState<RoboflowObjectDetection[]>([])
    const [webcamInitialized, setWebcamInitialized] = useState<boolean>(false)
    const [webcamWidth, setWebcamWidth] = useState(0)
    const [webcamHeight, setWebcamHeight] = useState(0)
    const roboflowClient = useRoboflowClientContext()
    const isReadyForCanvas = (webcamInitialized && webcamWidth > 0 && webcamHeight > 0)

    const detect = async (model: RoboflowModel) => {
        if (!webcamInitialized) return

        const webcam = webcamRef.current
        if (!webcam) return

        const video = webcam.video
        if (!video) return

        //  get detections
        try {
            const detections = await model.detect(video)
            console.log('roboflow detected', detections)
            setObjectDetections(detections)
        } catch (e) {
            const error = e as Error
            if (!error) return
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (webcamInitialized) {
            // load the model
            const roboflowLoadParams: RoboflowLoadParams = {
                model: fingerSpellingDetectionModel,
                version: fingerSpellingDetectionModelVersion
            }
            roboflowClient.load(roboflowLoadParams).then((roboflowModel) => {
                roboflowModel.configure({
                    threshold: 0.6,
                    max_objects: 1
                })
                // start inference
                roboflowClient.startInference(detect)
            })
        }
    }, [webcamInitialized])

    const handleRoboflowWebcamInitialized = () => {
        setWebcamInitialized(true)
        console.log('roboflow webcam initialized')
    }

    const handleRoboflowWebcamSizeChange = (width: number, height: number) => {
        setWebcamWidth(width)
        setWebcamHeight(height)
        console.log('roboflow webcam size change', width, height)
    }

    return (
        <FingerSpellingDetectorContainer>
            <FingerSpellingDetectorContent>
                <FingerSpellingDetectorVideoContent>
                    <RoboflowWebcam
                        ref={webcamRef}
                        mirrored={true}
                        onInitialized={handleRoboflowWebcamInitialized}
                        onSizeChange={handleRoboflowWebcamSizeChange}
                    >
                        {isReadyForCanvas &&
                            <RoboflowObjectDetectionCanvas
                                width={webcamWidth}
                                height={webcamHeight}
                                objectDetections={objectDetections}
                                mirrored={true}
                            />
                        }
                    </RoboflowWebcam>
                </FingerSpellingDetectorVideoContent>
                {!!objectDetections && <FingerSpellingSummary detections={objectDetections}/>}
            </FingerSpellingDetectorContent>
        </FingerSpellingDetectorContainer>
    )
}
