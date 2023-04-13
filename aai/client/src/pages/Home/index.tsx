import Pong from '../../components/Pong'
import React, { useState } from 'react';
import './button.css';
import AllFriends from '../../components/AllFriends';

function Home() {
	const [selectedMode, setSelectedMode] = useState<String>();
	const [selectedSize, setSelectedSize] = useState<String>();
	const [selectedSpeed, setSelectedSpeed] = useState<String>();
	const [isShown, setIsShown] = useState(false);

	const modeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedMode(event.target.value);
	}
	const sizeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedSize(event.target.id);
	}
	const speedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedSpeed(event.target.id);
	}

	const startGame = () => {
		setIsShown(current => true);
	}

	const endGame = () => {
		setIsShown(current => false);
	}

	return (
		<div>
			<h1>Welcome &lsaquo;user&rsaquo;</h1>

			<div className="container">
				<fieldset>
					<legend>Select game modes</legend>
					<p>
						<input
							type="radio"
							name="size"
							value="Normal"
							id="0"
							onChange={sizeHandler}
						/>
						<label htmlFor="1">Normal</label>

						<input
							type="radio"
							name="speed"
							value="Slow"
							id="3"
							onChange={speedHandler}
						/>
						<label htmlFor="1">Slow</label>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<input
							type="radio"
							name="mode"
							value="Local"
							id="1"
							onChange={modeHandler}
						/>
						<label htmlFor="1">Local</label>
					</p>

					<p>
						<input
							type="radio"
							name="size"
							value="Large"
							id="2"
							onChange={sizeHandler}
						/>
						<label htmlFor="2">Large</label>
						&nbsp;&nbsp;&nbsp;
						<input
							type="radio"
							name="speed"
							value="Normal"
							id="2"
							onChange={speedHandler}
						/>
						<label htmlFor="2">Normal</label>

						<input
							type="radio"
							name="mode"
							value="Online"
							id="2"
							onChange={modeHandler}
						/>
						<label htmlFor="2">Online</label>
						&nbsp;&nbsp;&nbsp;
						<button
							disabled={isShown || !selectedSize || !selectedSpeed || !selectedMode}
							onClick={startGame}>PLAY BUTTON</button>
					</p>

					<p>
						<input
							type="radio"
							name="size"
							value="Huge"
							id="4"
							onChange={sizeHandler}
						/>
						<label htmlFor="3">Huge</label>
						&nbsp;&nbsp;&nbsp;
						<input
							type="radio"
							name="speed"
							value="Fast"
							id="1"
							onChange={speedHandler}
						/>
						<label htmlFor="3">Fast</label>
					</p>
				</fieldset>
			</div>
			{isShown && selectedSize && selectedSpeed && selectedMode && <button onClick={endGame}>Quit</button>}
			{isShown && selectedSize && selectedSpeed && selectedMode === "Local" && <Pong speed={selectedSpeed} size={selectedSize} />}
			{isShown && selectedSize && selectedSpeed && selectedMode === "Online" && <>WORK IN PROGRESS</>}
		</div>
	)
}

export default Home
