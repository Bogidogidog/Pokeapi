import React from 'react'
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ConstGeneral from "../constants/ConstGeneral";

const PageLogin = () => {
	const navigate = useNavigate();

	const handelSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);

		const { username, password } = Object.fromEntries(formData.entries());

		const response = await fetch(ConstGeneral.API_URL + "/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await response.json();
		data && navigate("/home", { state: { user: data } });
	};

	const handelRegister = () => {
		navigate("/register");
	};

	return (
		<div>
			<Form onSubmit={handelSubmit}>
				<Form.Label htmlFor="inputUsername">username</Form.Label>
				<Form.Control type="text" name="username" id="inputUsername" />
				<Form.Label htmlFor="inputPassword">Password</Form.Label>
				<Form.Control
					type="password"
					name="password"
					id="inputPassword"
				/>
				<Form.Control type="submit" value="Login" />
				<Form.Control
					type="button"
					value="Register"
					onClick={handelRegister}
				/>
			</Form>
		</div>
	);
};

export default PageLogin;
