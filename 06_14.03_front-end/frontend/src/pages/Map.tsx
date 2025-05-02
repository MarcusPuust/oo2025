import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


function Map() {
  return (
    <div>
      <MapContainer className="map-container" center={[59.438, 24.771]} zoom={12} style={{ height: '50vh', margin: '3%', borderRadius: '20px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[59.439, 24.773]}>
          <Popup>
           Tallinna Ülikool <br /> Avatud 8.00-18.00
          </Popup>
        </Marker>
        <Marker position={[59.395, 24.672]}>
          <Popup>
           Tallinna Tehnikaülikool <br /> Avatud 7.30-22.00
          </Popup>
        </Marker>
        <Marker position={[59.4266, 24.741]}>
          <Popup>
           Tallinna Tehnikakõrgkool <br /> Avatud 8.00-19.00
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
