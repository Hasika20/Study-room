import React from "react"
import "./Header.css"

const Header = () => {
	return (
		<header>
			<div id='home'>
				<a href='/'>
					<i className='fa-solid fa-house'></i>
				</a>
			</div>
			<div id='chat_options'>
				<p id='selected_option'>
					Text to text <i className='fa-solid fa-chevron-down'></i>
				</p>
			</div>
		</header>
	)
}

export default Header
