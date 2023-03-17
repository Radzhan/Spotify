import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useAppDispatch,  } from "../../app/hooks";
import { ArtistsMutaion} from "../../types";
import InputBtn from "../../components/InputBtn/InputBtn";
import { postArtist } from "../../store/spotify";
import {useNavigate} from "react-router-dom";

const AddArtistForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [state, setState] = useState<ArtistsMutaion>({
		name: "",
		image: null,
	});

	const submitFormHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		await dispatch(postArtist(state));
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
						id="title"
						label="Name"
						value={state.name}
						onChange={inputChangeHandler}
						name="name"
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

export default AddArtistForm;
