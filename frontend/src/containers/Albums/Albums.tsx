import {Typography} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CardForAlbum from "../../components/CardForAlbum/CardForAlbum";
import {AlbumsArray, getAlbums} from "../../store/spotify";
import {selectUser} from "../../features/user/userSlice";

const Albums = () => {
	const arrayWithAlbums = useAppSelector(AlbumsArray);
	const user = useAppSelector(selectUser);
	const {id, name} = useParams();

	const dispatch = useAppDispatch();
	const requestAlbum = useCallback(async () => {
		await dispatch(getAlbums(id!));
	}, [dispatch, id]);

	useEffect(() => {
		requestAlbum().catch(console.error);
	}, [requestAlbum]);

	const createCard = arrayWithAlbums.map((element, index) => {
		if (user?.role === 'user' || user === null) {
			if (element.isPublished) {
				return (
					<CardForAlbum
						image={element.image}
						name={element.name}
						col={element.col}
						year={element.year}
						key={element._id}
						id={element._id}
						author={name!}
					/>
				);
			}
		} else {
			return (
				<>
					<CardForAlbum
						image={element.image}
						name={element.name}
						col={element.col}
						year={element.year}
						key={element._id}
						id={element._id}
						author={name!}
					/>
					{!element.isPublished ?
						<p>Не опубликоано</p> : null}
				</>
			);
		}

	});

	return createCard.length !== 0 ? (
		<div>
			<Typography gutterBottom variant="h5" component="div">
				Author: {name}
			</Typography>
			{createCard}
		</div>
	) : (
		<div>No Albums</div>
	);
};

export default Albums;
