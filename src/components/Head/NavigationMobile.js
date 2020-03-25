/** @jsx jsx */
import { jsx, Box, Flex, Close } from 'theme-ui'
import React, { useState } from 'react';
import Burger from '../burger';
import { mediaQueries } from "../../design-tokens/media-queries"
import { Link } from "gatsby"
import Logo from "../../assets/svg/logo.svg";
import Search from "../Search"
import { SearchIcon } from "../Search/styles"
import { bool } from 'prop-types';
import Container from "../container"

const searchIndices = [
    //   { name: `Pages`, title: `Pages`, hitComp: `PageHit` },
    { name: `Posts`, title: `Events`, type: `postHit` },
]

const navItemStyles = {
    borderBottom: `2px solid transparent`,
    color: `navigation.linkDefault`,
    display: `block`,
    fontSize: 5,
    lineHeight: 1.5,
    textDecoration: `none`,
    textAlign: `center`,
    // zIndex: 1,
    "&.active": { color: `navigation.linkActive`, }
}

const NavItem = ({ to, children }) => {
    return (
        <li
            sx={{
                display: `block`,
                m: 0,
                // mx: navItemHorizontalSpacing,
                // px: navItemHorizontalSpacing
            }}
        >
            <Link
                to={to}
                activeClassName="active"
                partiallyActive={true}
                sx={{
                    ...navItemStyles,
                    py: `13px`,
                    px: `40px`,
                }}
            >
                {children}
            </Link>

        </li>
    )
}

const menuStyles = {
    fontFamily: `heading`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    // alignSelf: `flex-end`,
    backgroundColor: `navigation.background`,
    minHeight: `100vh`,
    // textAlign: `left`,
    // pt: 80,
    position: `absolute`,
    top: 0,
    left: 0,
    transition: `transform 0.2s ease-in-out`,
    width: `100%`,
    // a: {
    //     fontSize: `1.5rem`,
    //     textAlign: `center`,
    //     textTransform: `uppercase`,
    //     padding: `2rem 0`,
    //     color: `pink`,
    //     textDecoration: `none`,
    //     transition: `color 0.3s linear`,
    //     "&:hover": {
    //         color: `blue`,
    //     },
    // },
}


const navlinks = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Events", url: "/events" },
    { title: "Execom Members", url: "/execom-members" },
    { title: "Contact", url: "/contact" },
];

const Menu = ({ open }) => {
    return (
        <nav sx={{
            ...menuStyles,
            transform: open ? `translateX(0)` : `translateX(-100%)`,
        }}>
            {navlinks.map((link, key) => (
                <NavItem key={key} to={link.url}>{link.title}</NavItem>
            ))}
        </nav>
    )
}

const SearchB = ({ show, setShow }) => {
    return (
        <div sx={{
            position: `absolute`,
            display: show.display ? `flex` : `none`,
            justifyContent: `space-between`,
            alignItems: `center`,
            height: `100%`,
            width: `100%`,
            // transform: show.opacity ? `translateX(0)` : `translateX(90%)`,
            opacity: show.opacity ? 1 : 0,
            // ml: 40,
            transition: `opacity 0.2s ease-in-out`,
            backgroundColor: `navigation.linkHover`,
            zIndex: 10,
            "form": {
                mb: 0,
            }
        }}>
            {/* <div sx={{ width: `20%` }}> */}
            <Search indices={searchIndices} />
            {/* </div> */}
            <Close
                onClick={() => {
                    setShow({
                        display: true,
                    })
                    setTimeout(() => setShow(false), 200)
                }}
                sx={{
                    // p: 0,
                    // height: `auto`,
                    // width: `auto`,
                    // justifyContent: `flex-end`,
                }}
            />
        </div>
    )
}

const NavigationMobile = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    // const [opacity, setOpacity] = useState(0);
    return (
        <div
            sx={{
                [mediaQueries.md]: {
                    display: `none`,
                },
            }}>
            <div
                sx={{
                    py: 6,
                    // px: 1,
                    // height: 7,
                    backgroundColor: `navigation.linkHover`,
                }}
            >
                <Container>
                    <Flex sx={{ px: 1, position: `relative`, alignItems: 'center', justifyContent: `space-between` }}>
                        <Burger open={open} setOpen={setOpen} />
                        <Logo
                            sx={{
                                height: 35,
                                fill: `primary`
                            }}
                        />
                        <div
                            sx={{
                                // display: `inline-block`,
                                // width: `85%`,
                                "form": {
                                    mb: 0,
                                },
                            }}
                            onClick={() => {
                                setShow({
                                    display: true
                                })
                                setTimeout(() => setShow({
                                    display: true,
                                    opacity: true,
                                }), 10)
                            }}
                        >
                            {/* <Search indices={searchIndices} collapse /> */}
                            <SearchIcon sx={{ display: `block` }} size={20} />
                        </div>
                        <SearchB show={show} setShow={setShow} />
                    </Flex>

                </Container>
            </div>
            <Menu open={open} setOpen={setOpen} />
        </div>
    )
}

Menu.propTypes = {
    open: bool.isRequired,
}

export default NavigationMobile