import {Button, Typography} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CardForTracks from "../../components/CardForTracks/CardForTracks";
import { changePublishTrack, deleteTrack, getTracks, TracksArray} from "../../store/spotify";
import {selectUser} from "../../features/user/userSlice";

const Tracks = () => {
	const arrayWithTracks = useAppSelector(TracksArray);
	const user = useAppSelector(selectUser);
	const {id, name, author} = useParams();

	const dispatch = useAppDispatch();
	const requestAlbum = useCallback(async () => {
		await dispatch(getTracks(id!));
	}, [dispatch, id]);

	useEffect(() => {
		requestAlbum().catch(console.error);
	}, [requestAlbum]);

	const onDelete = async (num: string) => {
		await dispatch(deleteTrack(num));
		await dispatch(getTracks(id!));
	};

	const changeTo = async (arg: string) => {
		await dispatch(changePublishTrack(arg));
		await dispatch(getTracks(id!));
	};

	const createCard = arrayWithTracks.map((element) => {
		if (user?.role === 'user' || user === null) {
			if (element.isPublished) {
				return (
					<CardForTracks
						isAdmin={false}
						name={element.name}
						time={element.time}
						key={element._id}
						id={element._id}
						number={element.number}
					/>
				);
			}
		} else {
			return (
				<div key={element._id}>
					<CardForTracks
						isAdmin={true}
						onDelete={() => onDelete(element._id)}
						name={element.name}
						time={element.time}
						id={element._id}
						number={element.number}/>
					{!element.isPublished ?
						<div>
							<p>Не опубликоано</p>
							<Button variant="contained" onClick={() => changeTo(element._id)}>Publicate</Button>
						</div> : null}
				</div>
			);
		}
	});

	return createCard.length !== 0 ? (
		<div>
			<Typography gutterBottom variant="h5" component="div">
				Author: {author}
				<Typography gutterBottom variant="h6" component="div">
					Album: {name}
				</Typography>
			</Typography>
			{createCard}
		</div>
	) : (
		<div>No Tracks</div>
	);
};

export default Tracks;
