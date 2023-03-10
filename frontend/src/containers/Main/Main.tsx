import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import CardForArtist from "../../components/CardForArtist/CardForArtist";
import {Atrists, getArtists} from "../../store/spotify";
import {selectUser} from "../../features/user/userSlice";

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

	const createCard = arrayWithArtists.map((element) => {
		if (user?.role === 'user' || user === null) {
			if (element.isPublished) {
				return (
					<CardForArtist
						name={element.name}
						image={element.image}
						key={element._id}
						id={element._id}
					/>
				);
			}
		} else {
			return (
				<>
					<CardForArtist
						name={element.name}
						image={element.image}
						key={element._id}
						id={element._id}
					/>
					{!element.isPublished ?
						<p>Не опубликоано</p> : null}
				</>
			);
		}
	});

	return <div>{createCard}</div>;
};

export default Main;
