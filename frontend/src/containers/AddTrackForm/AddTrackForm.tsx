import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector,} from "../../app/hooks";
import {AlbumsArrayFrom, Atrists, getAlbumFrom, getArtists, postTrack} from "../../store/spotify";
import {useNavigate} from "react-router-dom";

const AddTrackForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const allArtists = useAppSelector(Atrists);
	const allAlbum = useAppSelector(AlbumsArrayFrom);
	const [state, setState] = useState({
		name: "",
		number: 0,
		time: '',
		album: '',
		artists: '',
	});
	const getAll = useCallback(async () => {
		await dispatch(getArtists());
		await dispatch(getAlbumFrom(state.artists))
	}, [dispatch, state.artists])

	useEffect(() => {
		getAll().catch(console.error)
	}, [getAll])

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(postTrack({
			name: state.name,
			number: state.number,
			time: state.time,
			album: state.album,
		}))
		navigate('/');
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setState((prevState) => {
			return {...prevState, [name]: value};
		});
	};

	return (
		<form autoComplete="off" onSubmit={submitFormHandler}>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<Grid item xs>
						<TextField
							sx={{width: "25%"}}
							select
							label="Artist"
							name="artists"
							value={state.artists}
							onChange={inputChangeHandler}
							required
						>
							<MenuItem value="" disabled>
								Please select a Artist
							</MenuItem>
							{allArtists.map((element) => {
								return <MenuItem key={element._id} value={element._id}>
									{element.name}
								</MenuItem>
							})}
						</TextField>
					</Grid>

					<Grid item xs>
						<TextField
							sx={{width: "25%", my: 4}}
							select
							label="album"
							name="album"
							value={state.album}
							onChange={inputChangeHandler}
							required
						>
							<MenuItem value="" disabled>
								Please select a Artist
							</MenuItem>
							{allAlbum.map((element) => {
								return <MenuItem key={element._id} value={element._id}>
									{element.name}
								</MenuItem>
							})}
						</TextField>
					</Grid>
					<TextField
						id="title"
						label="Name"
						value={state.name}
						onChange={inputChangeHandler}
						name="name"
						required
					/>
					<TextField
						id="time"
						label="time"
						sx={{my: 4}}
						value={state.time}
						onChange={inputChangeHandler}
						name="time"
						required
					/>
					<TextField
						id="number"
						label="number"
						value={state.number}
						onChange={inputChangeHandler}
						name="number"
						required
					/>
				</Grid>

				<Grid item xs>
					<Button type="submit" color="primary" variant="contained">
						Create
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default AddTrackForm;
