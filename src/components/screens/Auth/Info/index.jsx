/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import Layout from '../../../common/Layout'
import styles from './Info.module.scss'
import './leaflelt.css'

const position = [61.37918, 22.28255]

const markerIcon = L.icon({
	iconUrl:
		'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
	iconSize: [40, 40],
	iconAnchor: undefined,
	popupAnchor: [...position],
	shadowUrl: undefined,
	shadowSize: undefined,
	shadowAnchor: undefined,
})

const Info = () => (
	<Layout>
		<div className={styles.infoContainer}>
			<div className={styles.mapContainer}>
				<MapContainer zoomControl center={position} zoom={12} scrollWheelZoom>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker icon={markerIcon} position={position}>
						<Popup>Korkaojantie 12, Kokemäki</Popup>
					</Marker>
				</MapContainer>
				,
			</div>
			<div className={styles.metaContainer}>
				<div className={styles.metaInner}>
					<ul>
						<li>Address: Korkaojantie 12, KoKokemäkike</li>
					</ul>
				</div>
			</div>
		</div>
	</Layout>
)

export default Info
