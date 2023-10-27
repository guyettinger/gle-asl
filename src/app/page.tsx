"use client"
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
    waitForRoboflowModule,
    RoboflowAuthParams,
    RoboflowApiProvider,
    RoboflowClientProvider
} from "gle-roboflow-components"
import { FingerSpellingDetector } from "@/components/FingerSpellingDetector/FingerSpellingDetector";
import { Loading } from "@/components/Loading";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10%
`

// Roboflow authorization
const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_1eRKBW2DCNhgsk4TWynWYt8bzEI3"
const roboflowAuthParams: RoboflowAuthParams = {
    publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY
}

// Detection model
const signLanguageDetectionModel = "asl-project"
const signLanguageDetectionModelVersion = "16"

export default function Home() {
    const [roboflowReady, setRoboflowReady] = useState(false)

    useEffect(() => {
        waitForRoboflowModule().then(() => {
            setRoboflowReady(true)
        })
    }, []);

    return (
        <HomeContainer>
            {roboflowReady &&
                <RoboflowApiProvider roboflowAuthParams={roboflowAuthParams}>
                    <RoboflowClientProvider>
                        <FingerSpellingDetector fingerSpellingDetectionModel={signLanguageDetectionModel}
                                                fingerSpellingDetectionModelVersion={signLanguageDetectionModelVersion}
                        />
                    </RoboflowClientProvider>
                </RoboflowApiProvider>
            }
            {!roboflowReady &&
                <Loading/>
            }
        </HomeContainer>
    )
}
