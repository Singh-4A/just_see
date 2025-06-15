import React, { useState } from "react";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import { Item } from "../Todo/todo";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * ==============   Animation   ================
 */

const cardVariants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 20,
        rotate: 0,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

/**
 * ==============   Data   ================
 */

const food = [
    ["🍅", 340, 10],
    ["🍊", 20, 40],
    ["🍋", 60, 90],
    ["🍐", 80, 120],
    ["🍏", 100, 140],
    ["🫐", 205, 245],
    ["🍆", 260, 290],
    ["🍇", 290, 320],
];

/**
 * ==============   Styles   ================
 */

const container = {
    margin: "100px auto",
    maxWidth: "500px",
    paddingBottom: "100px",
    width: "100%",
};

const cardContainer = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingTop: "20px",
    marginBottom: "-120px",
};

const splash = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    clipPath:
        'path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")',
};

const card = {
    fontSize: "164px",
    width: "100%",
    height: "190px",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    background: "#f5f5f5",
    boxShadow:
        "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
    transformOrigin: "10% 60%",
};

/**
 * ==============   Components   ================
 */

function Card({ emoji, hueA, hueB, i,
    removeHandler,
    editHandler,
    completeHandler,
    autoScrollPaginationHandler,
    item
}) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;


    const [showLess, setShowLess] = useState(false)

    const colorMap = {
        "react js": "bg-blue-200 text-blue-800",
        javascript: "bg-yellow-200 text-yellow-800",
        css: "bg-gray-200 text-gray-800",
        "material ui": "bg-indigo-200 text-indigo-800",
        tailwindcss: "bg-teal-200 text-teal-800",
        html: "bg-orange-200 text-orange-800",
    };






    return (

        
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
        >

            <motion.div
                style={card}
                variants={cardVariants} className="card">
                <Item
                    className={`  text-gray-900  hover:text-white bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer text-transform`}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"


                    >
                        <Typography
                        >{emoji}</Typography>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                cursor: 'pointer'
                            }}
                            gap={1}>
                            <EditIcon onClick={() => editHandler(item?._id)}>Edit</EditIcon>
                            <DeleteIcon onClick={() => removeHandler(item?._id)}> Delete</DeleteIcon>
                            <Typography>
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        completeHandler({
                                            current_value: e.target.checked,
                                            current_index: i,
                                        })
                                    }
                                />
                            </Typography>
                        </Box>

                    </Box>
                    <div className="flex flex-row basis-64  gap-1 flex-wrap">


                        {
                            !showLess && item?.skill?.slice(0, 4)?.map((chip, index) => {
                                return <div key={index}>
                                    <div className={`basis-50  border-2 border-purple-500 font-semibold ${colorMap[chip]}  bg-cyan-500    border-2 border-purple-500  rounded-full w-20 text-center  `}>{chip}</div>

                                </div>
                            })
                        }


                        {
                            showLess && item?.skill?.map((chip, index) => {
                                return <div key={index} >
                                    <div className={`basis-50  border-2 border-purple-500 font-semibold ${colorMap[chip]}  bg-cyan-500    border-2 border-purple-500  rounded-full w-20 text-center  `}>{chip}</div>

                                </div>
                            })
                        }



                        {
                            item?.skill?.length > 4 && <Box
                                className={`${!showLess ? "text-violet-500 font-bold" : "text-white font-bold"}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setShowLess(!showLess)

                                }}

                            >
                                {showLess ? "Show More" : "Show Less"}
                            </Box>
                        }


                    </div>




                </Item>

            </motion.div>



        </motion.div>


    );
}

export default function AnimationDemo({ todos = [],
    removeHandler,
    editHandler,
    completeHandler,
    autoScrollPaginationHandler,
    getLoading}) {
    return (
        <Grid container spacing={2}
        >
            { todos.map((item, i) => (
                <Grid key={i} size={{ xs: 12, md: 3 }}>
                    <Card emoji={item.name} hueA={10} hueB={1} i={i}
                        autoScrollPaginationHandler={autoScrollPaginationHandler}
                        removeHandler={removeHandler}
                        editHandler={editHandler}
                        item={item}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

// Add this CSS to your main CSS file or in a styled-component
// #sandbox > div {
//   width: 100%;
// }
