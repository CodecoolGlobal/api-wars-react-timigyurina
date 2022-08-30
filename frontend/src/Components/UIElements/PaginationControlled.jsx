import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationControlled = ({ val, page, onChange, pageCount }) => {
  /*     
  const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    }; 
  */

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "15px"
  };

  return (
    <Stack spacing={2} sx={style}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={pageCount}
        page={page}
        onChange={onChange}
        value={val}
      />
    </Stack>
  );
};

export default PaginationControlled;
