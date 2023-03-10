import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useAppDispatch,  } from "../../app/hooks";
import {AlbumMutation} from "../../types";
import InputBtn from "../../components/InputBtn/InputBtn";
import {postAlbum} from "../../store/spotify";
import {useNavigate} from "react-router-dom";

const ItemForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [state, setState] = useState<AlbumMutation>({
		artists: "",
		name: "",
		year: "",
		image: null,
	});

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(postAlbum(state));
		navigate('/');
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: files && files[0] ? files[0] : null,
		}));
	};

	return (
		<form autoComplete="off" onSubmit={submitFormHandler}>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<TextField
						sx={{ width: "25%" }}
						select
						label="Artist"
						name="artists"
						value={state.artists}
						onChange={inputChangeHandler}
						required
					>
						<MenuItem value="" disabled>
							Please select a category
						</MenuItem>
						<MenuItem value="640ae06b56424602b15721ce">
							Eminem
						</MenuItem>
						<MenuItem value="640ae06b56424602b15721d0">
							Pizza
						</MenuItem>
					</TextField>
				</Grid>

				<Grid item xs>
					<TextField
						id="title"
						label="Name"
						value={state.name}
						onChange={inputChangeHandler}
						name="name"
						required
					/>
				</Grid>

				<Grid item xs>
					<TextField
						id="price"
						label="Year"
						value={state.year}
						onChange={inputChangeHandler}
						name="year"
						required
					/>
				</Grid>

				<Grid item xs>
					<InputBtn
						label="Image"
						onChange={fileInputChangeHandler}
						name="image"
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

export default ItemForm;
