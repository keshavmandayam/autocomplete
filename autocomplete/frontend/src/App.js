import fetch from 'cross-fetch';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

export default function AutoComplete() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  // api call handler
  const onChangeHandle = async value => {
    if (value && value.length > 0) {
      const response = await fetch('http://localhost:9000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: value,
        })
      })
      const movies = await response.json();
      setOptions(movies.map(movie => movie.title));
    } else {
      setOptions([]);
    }
  };

  // used to throttle excessive api calls. Waits 300ms after user stops typing before sending request.
  const debounceOnChange = _.debounce((event) => {
    onChangeHandle(event.target.value);
  }, 300)

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
            Movie Search
        </Typography>
      </Toolbar>
    </AppBar>
    <Typography variant="h5"
      style={{ width: 400, margin: "auto", marginTop: "10%" }}
    >
            Your favorite movie in the top 1000?
    </Typography>
    <Autocomplete
      id="asynchronous"
      style={{ width: 500, margin: "auto", marginTop: "2%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          onChange={ev => debounceOnChange(ev)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </div>
  );
}