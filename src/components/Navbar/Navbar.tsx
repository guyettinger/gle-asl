"use client"
import { useState } from "react";
import { MdHelp } from "react-icons/md";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeading,
    PopoverTrigger
} from "gle-components";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px 1rem 0;
  color: #efefef;
  background-color: #1D1E20;
`

const AslLogoImage = styled(Image)`
  margin: -10px 10px -10px 20px
`

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const HelpPopoverContent = styled(PopoverContent)`
  color: black;
  max-width: 300px;
`

const HelpIcon = styled(MdHelp)`
  font-size: 32px;
  margin-right: 4px;
  vertical-align: text-top;
  
  &:hover {
    color: white;
  }
`

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <NavContainer>
            <NavLogo>
                <AslLogoImage alt="asl logo"
                              src='./images/asl-logo.png'
                              width={95}
                              height={40}/>
                <Link href="/">
                    Finger Spell
                </Link>
            </NavLogo>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild={true} onClick={() => setOpen((v) => !v)}>
                    <span><HelpIcon/></span>
                </PopoverTrigger>
                <HelpPopoverContent>
                    <PopoverHeading>Directions</PopoverHeading>
                    <PopoverDescription>
                        Point your webcam at your hands to practice ASL finger spelling.
                    </PopoverDescription>
                    <PopoverDescription>
                        <img alt='asl-chart'
                             src='./images/asl-chart.png'
                             width={"100%"}/>
                    </PopoverDescription>
                </HelpPopoverContent>
            </Popover>
        </NavContainer>
    )
}