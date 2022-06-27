import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import TableDetails from './TableDetails'
import ReactLoading from 'react-loading';
import { withTranslation } from 'react-i18next';
import axios from 'axios';
import CONFIG from'../../config.json'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            style={{ direction: "rtl", width: "100%" }}

            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const headerOpt = {
    'Content-type': 'application/json',
    'Authorization': localStorage.getItem('jwt')
}

class vehicleDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commonData: null,
            vehicleData: null,
            companyData: null,
            monitoringData: null,
            isCommonDataLoaded: false,
            isVehicleDataLoaded: false,
            isCompanyDataLoaded: false,
            isMonitoringDataLoaded: false,
            value: 0,
            seed: 10000

        }
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };

    getCommonData() {
        const URL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${this.props.key2}`
        fetch(URL, {
            headers: headerOpt
        }).then(res => res.json()).then(
            (result) => {
                this.setState({ commonData: result.value, isCommonDataLoaded: true })
            },
            (error) => {
                console.log('Data not loaded')
            }
        ).catch(error => {
            console.log(error)
        })
    }
    getAVehicleData() {
        const URL = `${CONFIG.HOST}/api/Vehicles/GetDetailsById?id=${this.props.key2}`
        fetch(URL, {
            headers: headerOpt
        }).then(res => res.json()).then(
            (result) => {
                this.setState({ vehicleData: result.value, isVehicleDataLoaded: true })
            },
            (error) => {
                console.log("data not loaded")
            }
        ).catch(error => {
            console.log(error)
        })
    }

    getACompanyData = async () => {
        const vehicleURL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${this.props.key2}`
        const options = {
            url: vehicleURL,
            headers: headerOpt
        }
        try {
            const vehicleResponse = await axios.get(vehicleURL, options)
            try {
                const companyURL = `${CONFIG.HOST}/api/Companies/GetDetailsById?id=${vehicleResponse.data.value[0].companyNumber}`
                const options = {
                    url: companyURL,
                    headers: headerOpt
                }
                const companyResponse = await axios.get(companyURL, options)
                if (companyResponse.data.success)
                    this.setState({ companyData: companyResponse.data.value, isCompanyDataLoaded: true })
            } catch (error) {
                console.error("There is no company data on this vehicle = ", error)
            }

        } catch (error) {
            console.error("error = ", error)
        }
        return (false)
    }


    getMonitoringData() {
        const URL = `${CONFIG.HOST}/api/Monitorings/GetVehicleDetailsByVehicleNumber?vehicleNumber=${this.props.key2}`
        fetch(URL, {
            headers: headerOpt
            
        }).then(res => res.json()).then(
            (result) => {
                this.setState({ monitoringData: result.value, isMonitoringDataLoaded: true })
            },
            (error) => {
                console.log("data not loaded")
            }
        ).catch(error => {
            console.log(error)
        })
    }


    componentDidMount() {
        this.setState({
            seed: this.state.seed + 1
        })
        this.getCommonData();
        this.getAVehicleData();
        this.getACompanyData();
        this.getMonitoringData();


    }
    loadingComponent() {
        return <ReactLoading
            type={"spin"}
            color="#123212"
            style={{ width: "30px", height: "22px", justifyContent: "center", alignText: "center" }}
            height={2}
            width={2} />
    }
    render() {
        const { t } = this.props;
        return (
            <div className={"tabsAndArrowConteiner"}>
                <div className={"tabsContainer"}>
                    <AppBar position="static" style={{backgroundColor: "#3F51B5", color: "white"}}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"

                        >
                            <Tab className="capitalize colorWhite" label={t("most common information")} {...a11yProps(0)} />
                            <Tab className="capitalize colorWhite" label={t("vehicles data")} {...a11yProps(1)} />
                            <Tab className="capitalize colorWhite" label={t("company data")} {...a11yProps(2)} />
                            <Tab className="capitalize colorWhite" label={t("monitoring data")} {...a11yProps(3)} />
                        </Tabs>
                    </AppBar>
                    {/* ---------------common Data -------------- */}
                    {this.state.isCommonDataLoaded ? <TabPanel value={this.state.value} index={0} className='Tabs'>
                        <TableDetails data={this.state.commonData} seed={this.state.seed}
                        />
                    </TabPanel> :
                        <>
                            
                        </>

                    }
                    {/* ---------------Vehicles Data -------------- */}

                    {this.state.isVehicleDataLoaded == true ? <TabPanel value={this.state.value} index={1} className='Tabs'>
                        <TableDetails data={this.state.vehicleData} seed={this.state.seed}
                        />
                    </TabPanel> :
                        <>
                            
                        </>

                    }
                    {/* ---------------Company Data -------------- */}

                    {this.state.isCompanyDataLoaded == true ? <TabPanel value={this.state.value} index={2} className='Tabs'>
                        <TableDetails data={this.state.companyData} seed={this.state.seed}
                        />
                    </TabPanel> :
                        <>
                        
                        </>

                    }

                    {/* ---------------Monitoring Data -------------- */}

                    {this.state.isMonitoringDataLoaded == true ? <TabPanel value={this.state.value} index={3} className='Tabs'>
                        <TableDetails data={this.state.monitoringData} seed={this.state.seed}
                        />
                    </TabPanel> :
                        <>
                            {
                                localStorage.getItem("i18nextLng") === "ar" ?
                                    <div className="loadingContainer">
                                        <h3 className='loadingText ar directionCenter'>{t("loading...")}</h3>
                                    </div> :
                                    <div className="loadingContainer">
                                        <h3 className='loadingText en directionCenter'>{t("loading...")}</h3>
                                    </div>
                            }
                        </>

                    }
                </div>
                <div className="arrow"></div>
            </div>
        );
    }
}
export default withTranslation('tableDetails')(vehicleDetails);
