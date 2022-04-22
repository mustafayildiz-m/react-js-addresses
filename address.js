//add_address
//main component
const Address = () => {
    const [provinces, setProvinces] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [neighbourhood, setNeighbourhood] = React.useState([]);
    const [provinceId, setProvinceId] = React.useState([]);
    const [districtId, setDistrictId] = React.useState([]);

    const province = async () => {
        const response = await fetch('https://mobilservis.kintshop.com/MobileController/province/provinceId')
            .then(response => response.json());
        setProvinces(response);
    }
    React.useEffect(() => {
        province()
    }, [])

    const handleProvinceChange = (event) => {
        setNeighbourhood([]);
        setDistrict([]);
        setProvinceId(event.target.value)
        fetch(`https://mobilservis.kintshop.com/MobileController/district/${event.target.value}`)
            .then(response => response.json())
            .then(data => setDistrict(data));
    }
    const handleDistrictChange = (event) => {
        setDistrictId(event.target.value);

        fetch(`https://mobilservis.kintshop.com/MobileController/neighborhood/${provinceId}/${event.target.value}`)
            .then(response => response.json())
            .then(data => setNeighbourhood(data))
    }

    return (
        <div className="row">
            <Province handleProvinceChange={handleProvinceChange} provinces={provinces}/>
            <District handleDistrictChange={handleDistrictChange} district={district}/>
            <Neighbourhood neighbourhood={neighbourhood}/>
        </div>
    )
}
//components
const Province = (props) => {


    return (
        <div className="col-md-6">
            <label className="form-label">İl</label>
            <select onChange={props.handleProvinceChange} name="province_id" className="form-select province" required>
                <option selected>İl</option>
                {props.provinces.map(province =>
                    <option value={province.id}
                            key={province.id}>{province.province_name}</option>
                )}

            </select>
            <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
        </div>
    )
}
const District = (props) => {
    return (
        <div className="col-md-6">
            <label className="form-label">İlçe</label>
            <div>
                <select onChange={props.handleDistrictChange} className="form-select">
                    <option value={0} selected>İlçe</option>
                    {props.district.map(item =>
                        <option key={item.id} value={item.id}>{item.district_name}</option>
                    )}
                </select>
                <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
            </div>
        </div>
    )

}
const Neighbourhood = (props) => {
    return (
        <div className="col-md-6">
            <label className="form-label">Mahalle</label>
            <div>
                <select name="neighborhood_id" className="form-select">
                    <option value={0} selected>Mahalle</option>
                    {props.neighbourhood.map(item =>
                        <option key={item.id} value={item.id}>{item.neighborhood_name}</option>
                    )}

                </select>
                <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
            </div>
        </div>
    )
}

const element = document.querySelector("#result");
ReactDOM.render(React.createElement(Address), element);



//adress update
//main component
const AddressEdit = () => {
    const [provinces1, setProvinces1] = React.useState([]);
    const [district1, setDistrict1] = React.useState([]);
    const [neighbourhood1, setNeighbourhood1] = React.useState([]);
    const [provinceId1, setProvinceId1] = React.useState('');
    const [districtId1, setDistrictId1] = React.useState('');

    const province = async () => {
        const response = await fetch('https://mobilservis.kintshop.com/MobileController/province/provinceId')
            .then(response => response.json());
        setProvinces1(response);

    }
    const district = async () => {
        const response = await fetch(`https://mobilservis.kintshop.com/MobileController/district/${PROVINCE_ID}`)
            .then(response => response.json());
        setDistrict1(response)

    }
    const neighbourhood = async () => {
        const response = await fetch(`https://mobilservis.kintshop.com/MobileController/neighborhood/${PROVINCE_ID}/${DISTRICT_ID}`)
            .then(response => response.json())
        setNeighbourhood1(response);

    }

    React.useEffect(() => {
        province()
        district()
        neighbourhood()
    }, [])


    const provinceChangeHandler = (event) => {
        setProvinceId1(event.target.value)
        fetch(`https://mobilservis.kintshop.com/MobileController/district/${event.target.value}`)
            .then(response => response.json())
            .then(data => setDistrict1(data))
        setNeighbourhood1([{
            id: 0,
            neighborhood_name: 'Seçiniz'
        }])
    }

    const districtChangeHandler = (event) => {
        setDistrictId1(event.target.value);
        fetch(`https://mobilservis.kintshop.com/MobileController/neighborhood/${provinceId1}/${event.target.value}`)
            .then(response => response.json())
            .then(data => setNeighbourhood1(data))
    }

    return (
        <div className="row">
            <Province1 provinceChangeHandler={provinceChangeHandler} provinces1={provinces1}/>
            <District1 districtChangeHandler={districtChangeHandler} district1={district1}/>
            <Neighbourhood1 neighbourhood1={neighbourhood1}/>
        </div>
    )
}
//components
const Province1 = (props) => {
    return (
        <div className="col-md-6">
            <label className="form-label">İl</label>
            <select onChange={props.provinceChangeHandler} name="province_id" className="form-select province" required>
                {props.provinces1.map(province =>
                    province.id === PROVINCE_ID ?
                        <option selected value={province.id} key={province.id}>{province.province_name}</option> :
                        <option value={province.id} key={province.id}>{province.province_name}</option>
                )}
            </select>
            <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
        </div>
    )
}
const District1 = (props) => {
    return (
        <div className="col-md-6">
            <label className="form-label">İlçe</label>
            <div>
                <select onChange={props.districtChangeHandler} className="form-select">
                    {props.district1.map(district =>
                        district.id === DISTRICT_ID ?
                            <option key={district.id} selected value={district.id}>{district.district_name}</option> :
                            <option key={district.id} value={district.id}>{district.district_name}</option>
                    )}
                </select>
                <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
            </div>
        </div>
    )

}
const Neighbourhood1 = (props) => {
    return (
        <div className="col-md-6">
            <label className="form-label">Mahalle</label>
            <div>
                <select name="neighborhood_id" className="form-select">
                    {props.neighbourhood1.map(neighbourhood =>
                        neighbourhood.id === NEIG_ID ?
                            <option selected key={neighbourhood.id}
                                    value={neighbourhood.id}>{neighbourhood.neighborhood_name}</option> :
                            <option key={neighbourhood.id}
                                    value={neighbourhood.id}>{neighbourhood.neighborhood_name}</option>
                    )}


                </select>
                <div className="invalid-feedback">Bu alan boş bırakılamaz.</div>
            </div>
        </div>
    )
}

const element1 = document.querySelector("#result1");
ReactDOM.render(React.createElement(AddressEdit), element1);



