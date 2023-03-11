import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CardForArtist from "../../components/CardForArtist/CardForArtist";
import {Atrists, changePublishArtist, deleteArtist, getArtists} from "../../store/spotify";
import {selectUser} from "../../features/user/userSlice";
import {Button} from "@mui/material";

const Main = () => {
	const arrayWithArtists = useAppSelector(Atrists);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const requestArtist = useCallback(async () => {
		await dispatch(getArtists());
	}, [dispatch]);

	useEffect(() => {
		requestArtist().catch(console.error);
	}, [requestArtist]);

	const onDelete = async (num: string) => {
		await dispatch(deleteArtist(num));
		await dispatch(getArtists());
	};

	const changeTo = async (arg: string) => {
		await dispatch(changePublishArtist(arg));
		await dispatch(getArtists());
	};

	const createCard = arrayWithArtists.map((element) => {
		if (user?.role === 'user' || user === null) {
			if (element.isPublished) {
				return (
					<CardForArtist
						isAdmin={false}
						name={element.name}
						image={element.image}
						key={element._id}
						id={element._id}
					/>
				);
			}
		} else {
			return (
				<div key={element._id}>
					<CardForArtist
						onDelete={() => onDelete(element._id)}
						isAdmin={true}
						name={element.name}
						image={element.image}
						id={element._id}
					/>
					{!element.isPublished ?
						<div>
							<p>Не опубликоано</p>
							<Button variant="contained" onClick={() => changeTo(element._id)}>Publicate</Button>
						</div> : null}
				</div>
			);
		}
	});

	return <div>{createCard}</div>;
};

export default Main;
