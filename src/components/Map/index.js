import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import map_info from './map_info.json'
import { useLocation } from 'react-router-dom';
import './styles.css';

function GameMaps() {
    var states = useLocation().state; // state for which map the user picked from home page
	var markers = []; // holds all marker/icon information
	let map; // map variable
	let map_icons; // database
	let bounds; // map bounds variable
	let image; // image variable

	// Saves the state on first load. In the event of a refresh, an error will occur since state will be lost, but localStorage has the saved state prior to the refresh.
	try {
		localStorage.setItem("mapNum", states.map_num);
		localStorage.setItem("mapName", states.map_name);
	} catch (err) {
		;
	}

	// Click listener map icons
	function onClick(e) {
		document.getElementById("video-background").style.display = "block";
		document.getElementsByClassName("videoWrapper")[0].style.display = "block";

		// Searches through all the links to find the video that matches the specific clicked icon
		for (var i = 0; i < map_icons.length; i++){
			if ((map_icons[i].position[0] === e.latlng.lat) && (map_icons[i].position[1] === e.latlng.lng)){
				document.getElementById("video-frame").src = map_icons[i].url + "?rel=0&autoplay=1";
			}
		}
		document.getElementById("close-button").addEventListener("click", buttonClick);
		document.getElementById("video-background").addEventListener("click", bgClick);
	};

	// Allows the user to close the video player by clicking the x button
	function buttonClick() {
		document.getElementById("video-background").style.display = "none";
		document.getElementsByClassName("videoWrapper")[0].style.display = "none";
		document.getElementById("video-frame").src = "";
	}

	// Allows the user to close the video player by clicking the map instead of the x button
	function bgClick() {
		document.getElementById("video-background").style.display = "none";
		document.getElementsByClassName("videoWrapper")[0].style.display = "none";
		document.getElementById("video-frame").src = "";
	}

	// Clears all the markers/icons on the map
	function clearMarkers() {
		for (var i=0; i < markers.length; i++){
			map.removeLayer(markers[i]);
		}

		markers = [];
	}

	// Loads in icons from the database for the specified map
	function loadMap(agent_info){
		for (var i = 0; i < agent_info.length; i++){

			var iconVar = L.icon({
				iconUrl: agent_info[i].iconUrl,
				iconSize: [20,20],
				iconAnchor: [10, 20],
				className: agent_info[i].className,
			});

			var marker = new L.Marker(agent_info[i].position, { icon: iconVar });
			markers.push(marker);
			marker.addTo(map).on('click', onClick);
		};
	}

	// Changes the map and loads in its icons when the user switches the map using the radio checkboxes on the bottom right
	function mapChange(event) {
		var map_name_id = event.target.id.split('-');
		localStorage.setItem("mapName", map_name_id[0]);
		localStorage.setItem("mapNum", map_name_id[1]);

		clearMarkers();
		map_icons = map_info.icon_db[localStorage.getItem("mapNum")][localStorage.getItem("mapName")];
		map.removeLayer(image);
		image = L.imageOverlay('./images/maps/' + localStorage.getItem("mapName") + ".png", bounds).addTo(map);
		loadMap(map_icons);
	}

	useEffect(() => {
		/* Setting default map to avoid crashing upon reload */
		document.getElementsByClassName("btn btn-secondary")[localStorage.getItem("mapNum")].className += " active"
		map_icons = map_info.icon_db[localStorage.getItem("mapNum")][localStorage.getItem("mapName")];

		// Loads in the map image
		map = L.map('image-map', {
			minZoom: 0,
			maxZoom: 3,
			center: [0, 0],
			zoom: 1,
			crs: L.CRS.Simple,
			attributionControl: false,
			zoomControl: false
		});

		// Calculation to center and fit the image for each device
		var sw = map.unproject([0,1500], map.getMaxZoom()-1);
		var ne = map.unproject([1500, 0], map.getMaxZoom()-1);
		bounds = new L.LatLngBounds(sw, ne);
		image = L.imageOverlay('./images/maps/' + localStorage.getItem("mapName") + '.png', bounds).addTo(map);
		map.fitBounds(bounds);

		// Position of zoom tool
		L.control.zoom({
			position:'topright'
		}).addTo(map);

		loadMap(map_icons);

		// On clcik listeners for the radio checkbox buttons for switching maps
		document.getElementsByClassName("btn btn-secondary")[0].addEventListener("click", mapChange);
		document.getElementsByClassName("btn btn-secondary")[1].addEventListener("click", mapChange);
		document.getElementsByClassName("btn btn-secondary")[2].addEventListener("click", mapChange);
		document.getElementsByClassName("btn btn-secondary")[3].addEventListener("click", mapChange);

	});

	return (
		<div className="the-page">
			<div className="videoWrapper">
				<div className="x-button">
					<button id="close-button" type="button" className="close" aria-label="Close">
  						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<iframe title="video-player" id="video-frame" frameBorder="0" allow="autoplay" allowFullScreen={true}/>
			</div>
			<div id="video-background"></div>
			<div className="pop-in">
				<div id="image-map">
					<div className="home-btn"><Link to={{ pathname: '/'}}><button type="button" class="btn btn-dark">Home</button></Link></div>
					
					<div class="leaflet-bottom leaflet-right">
						<div className="checkbox-wrapper">
							<div class="btn-group btn-group-toggle" data-toggle="buttons">
								<label className="btn btn-secondary" id="ascent-0">
									<input type="radio" name="options" id="ascent-btn" autocomplete="off"/> Ascent
								</label>
								<label className="btn btn-secondary" id="bind-1">
									<input type="radio" name="options" id="bind-btn" autocomplete="off"/> Bind
								</label>
								<label className="btn btn-secondary" id="haven-2">
									<input type="radio" name="options" id="haven-btn" autocomplete="off"/> Haven
								</label>
								<label className="btn btn-secondary" id="split-3">
									<input type="radio" name="options" id="split-btn" autocomplete="off"/> Split
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default GameMaps;