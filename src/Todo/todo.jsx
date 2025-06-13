import "./todo.css";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
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
  backgroundColor: 'antiquewhite'
}));
const TodoList = ({
  todos = [],
  removeHandler,
  editHandler,
  completeHandler,
  autoScrollPaginationHandler,
  getLoading,
}) => {
  return (


    <Box sx={{ flexGrow: 1 }}
      className="inside_box"

      onScroll={autoScrollPaginationHandler} p={1}



      style={{
        marginTop: 10,
        overflow: "auto",
        height: 580,
        padding: 10,
        borderRadius: 4,
      }}>
      <Grid container spacing={2}>

        {getLoading === "Error" && "Something went wrong!"}
        {!getLoading &&
          todos?.map((item, i) => {
            return (
              <>
                <Grid size={{ xs: 12, md: 3, }}>
                  <Item>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"

                    >
                      <Typography >{item?.name}</Typography>
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

                  </Item>

                </Grid>

              </>
            );
          })}


      </Grid>
    </Box>

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
