import "./todo.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AnimationDemo from "../animation/animtion";


export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'gray',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  height: 100,
  borderRadius: 20,
  border: "1px solid black",
}));
const TodoList = ({
  todos = [],
  removeHandler,
  editHandler,
  completeHandler,
  autoScrollPaginationHandler,
  getLoading,
  dragstartHandler,
  dropHandler,
  dragoverHandler,
  onDragLeave

}) => {

  return (
    <div
      onScroll={autoScrollPaginationHandler}
      className="inside_box"
      style={{
        overflow: "auto",
        height: 500,
        padding: 10,
        borderRadius: 4,
        // marginTop: 10,
      }}>

      <AnimationDemo
        dragstartHandler={dragstartHandler}
        dropHandler={dropHandler}
        dragoverHandler={dragoverHandler}
        onDragLeave={onDragLeave}
        todos={todos} autoScrollPaginationHandler={autoScrollPaginationHandler} editHandler={editHandler} getLoading={getLoading} removeHandler={removeHandler} />



    </div>
    // <Box sx={{ flexGrow: 1 }}
    //   onScroll={autoScrollPaginationHandler} p={1}
    //   style={{
    //     marginTop: 10,
    //     overflow: "auto",
    //     height: 540,
    //     padding: 10,
    //     borderRadius: 4,
    //   }}>
    //   <Grid container spacing={2}>

    //     {getLoading === "Error" && "Something went wrong!"}
    //     {!getLoading &&
    //       todos?.map((item, i) => {
    //         return (
    //           <>
    //             <Grid size={{ xs: 12, md: 3, }}
    //             >

    //               <Item
    //                 className=" capitalize text-gray-900  hover:text-white bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer text-transform"
    //               >
    //                 <Box
    //                   display="flex"
    //                   alignItems="center"
    //                   justifyContent="space-between"

    //                 >
    //                   <Typography
    //                   >{item?.name}</Typography>
    //                   <Box
    //                     display="flex"
    //                     alignItems="center"
    //                     justifyContent="space-between"
    //                     sx={{
    //                       cursor: 'pointer'
    //                     }}
    //                     gap={1}>
    //                     <EditIcon onClick={() => editHandler(item?._id)}>Edit</EditIcon>
    //                     <DeleteIcon onClick={() => removeHandler(item?._id)}> Delete</DeleteIcon>
    //                     <Typography>
    //                       <input
    //                         type="checkbox"
    //                         onChange={(e) =>
    //                           completeHandler({
    //                             current_value: e.target.checked,
    //                             current_index: i,
    //                           })
    //                         }
    //                       />
    //                     </Typography>
    //                   </Box>

    //                 </Box>

    //                 <div class="flex flex-row basis-64  gap-1 flex-wrap">
    //                   <div class="basis-50  border-2 border-purple-500 font-semibold bg-cyan-500   background-red border-2 border-purple-500  rounded-full w-20 text-center  ">react js</div>
    //                   <div class="basis-50 border-2 border-purple-500 font-semibold  bg-yellow-500  border-2 border-purple-500  rounded-full w-20 text-center ">javascript</div>
    //                   <div class="basis-50 border-2 border-purple-500 font-semibold bg-white border-2 border-purple-500  rounded-full w-20 text-center ">css</div>
    //                   <div class="basis-50 border-2 border-purple-500 font-semibold bg-skyblue   border-2 border-purple-500  rounded-full w-20 text-center ">material ui</div>
    //                   <div class="basis-50 border-2 border-purple-500 font-semibold bg-yellow-500  border-2 border-purple-500  rounded-full w-20 text-center ">telwindcss</div>
    //                   <div class="basis-50 border-2 border-purple-500 font-semibold bg-sky-500/50 border-2 border-purple-500  rounded-full w-20 text-center ">html</div>
    //                 </div>



    //               </Item>

    //             </Grid>

    //           </>
    //         );
    //       })}


    //   </Grid>
    // </Box>

    // <div

    //   className="inside_box"
    //   style={{
    //     marginTop: 10,
    //     overflow: "auto",
    //     height: 256,
    //     // width: 340,
    //     border: "1px solid black",
    //     padding: 10,
    //     borderRadius: 4,
    //   }}
    // >
    //   {/* {!getLoading && "loading"} */}

    // </div>
  );
};

export default TodoList;
