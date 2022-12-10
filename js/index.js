var map;
var markers=[];
var infoWindow;
var locationselect;





function initMap(){
var losAngele ={lat:34.063380 , lng:-118.358080};
map = new google.maps.Map(document.getElementById('map'), {
    center:losAngele,
    zoom:11,
    mapTypeId:'roadmap',

    
});


infoWindow = new google.maps.infoWindow();
searchStores();
}

function clearLocation(){
    infoWindow.close();
    for(var i = 0; i < markers.length;i++){
        markers[i].setMap(null);
    }
    markers.length=0;
}

function searchStores(){
    
    var foundStores=[];
    var zipCode = document.getElementById('zip-code-input').ariaValueMax;
  if(zipCode){
    stores.foreach((store,index)=>{
        if(store.address.postalCode.subString(0,5) == zipCode){
            foundStores.push(store);
        }
    })
  }

  else{
    foundStores=stores;
  }
  clearLocation();
  displayStores(foundStores);
  showStoreMarkers(foundStores);
  setOnClickListener();
}


function setOnClickListener(){
    var storeElements =document.querySelectorAll('.store-container');

    storeElements.foreach((elem,index)=>{
        elem.addListener('click', ()=>{
            new google.maps.trigger(markers[index], 'click');
        });
    });
}


function displayStores(stores){
    var storesHtml='';
    stores.foreach((store,index)=>{
       storesHtml +=`<div class="store-container">
       <div class="store-container-background">
           <div class="store-info-container">
           <div class="store-address">
               <span>${store.AddressLines[0]}</span>
              <span>${store.addressLines[1]}</span>
           </div>
           <div class="store-phone-number">${store.PhoneNumber}</div>
       </div>
           <div class="store-number-container">
               <div class="store-number">${index}</div>
           </div>
       </div>
   </div>`

    });

    document.querySelector('.stores-list').innerHTML=storesHtml;
}



function showStoreMarkers(stores){
var bounds = new google.maps.LatLngBounds();
    stores.foreach((store, index)=>{
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude
        );
        var name = store.name;
        var address = store.addressLines[0];
        createMarker(latlng , name ,address ,index);
        bounds.extend(latlng);
    })
    map.fitBounds(bounds);
}


function createMarker(latLng, name, address, index){

    var html ="<br>" + name +"</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map:map,
        position:latLng,
        label:`${index +1}`
    });
    google.maps.event.addListener(marker,'click', ()=>{
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    })
    markers.push(marker);
}