"use client"
import styled from "styled-components";
import { RoboflowObjectDetection } from "gle-roboflow-components";
import { FingerSpellingSummaryProps } from "@/components/FingerSpellingSummary/FingerSpellingSummary.types";

const FingerSpellingSummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FingerSpellingSummaryText = styled.div`
  text-align: center;
  margin: 1rem 0;
  width: 80%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const FingerSpellingSummaryHeader1 = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  min-height: 34px;
`

const FingerSpellingChartContainer = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
  background: whitesmoke;
  border-radius: 8px;
`

export const FingerSpellingSummary = ({detections}: FingerSpellingSummaryProps) => {

    return (
        <FingerSpellingSummaryContainer>
            <FingerSpellingSummaryText>
                <FingerSpellingSummaryHeader1>
                    {detections.map((detection: RoboflowObjectDetection) => {
                        return (
                            <span style={{color: detection.color}}>{detection.class}</span>
                        )
                    })}
                </FingerSpellingSummaryHeader1>
            </FingerSpellingSummaryText>
        </FingerSpellingSummaryContainer>
    )
}