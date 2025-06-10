import "./todo.css";
const TodoList = ({
  todos = [],
  removeHandler,
  editHandler,
  completeHandler,
  autoScrollPaginationHandler,
  getLoading,
}) => {
  console.log(getLoading);
  return (
    <div
      onScroll={autoScrollPaginationHandler}
      className="inside_box"
      style={{
        marginTop: 10,
        overflow: "auto",
        height: 256,
        width: 340,
        border: "1px solid black",
        padding: 10,
        borderRadius: 4,
      }}
    >
      { !getLoading && "loading"}
      {getLoading === "Error" && "Something went wrong!"}

      {/* <div class="flex flex-row flex-wrap justify-center  "> */}
      {!getLoading &&
        todos?.map((item, i) => {
          return (
            <>
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "beige",
                  marginBottom: 5,
                }}
              >
                <li>{item?.name}</li>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <li onClick={() => removeHandler(item?._id)}> Delete</li>
                  <li onClick={() => editHandler(item?._id)}>Edit</li>
                  <li>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        completeHandler({
                          current_value: e.target.checked,
                          current_index: i,
                        })
                      }
                    />
                  </li>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default TodoList;
