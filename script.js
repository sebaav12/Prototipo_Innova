window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                 lat: -38.535790,
                 lng: -72.422206,
            },
        },
    ];
}

var models = [
    {
        url: 'assets/models/earth/earth.gltf',
        scale: '0.020583155377681475 0.020583155377681475 0.020583155377681475',
        info: 'Earth, nuestro hogar',
        rotation: '0 180 0',
    },
    {
        url: 'assets/models/mars/mars.gltf',
        scale: '0.001679621049852858 0.001679621049852858 0.001679621049852858',
        rotation: '0 180 0',
        info: 'Mars, la proxima frontera',
    },
    {
        url: 'assets/models/jupiter/asset.gltf',
        scale: 'scale="0.002051953344612564 0.002051953344612564 0.002051953344612564',
        rotation: '0 180 0',
        info: 'Jupiter, ese gigante de gas ...',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}