import React, {Component} from "react";
import axios from "axios";
import ArraySort from 'array-sort'
import NumberFormat from "react-number-format";
import Spinner from "../../../components/Spinner/Spinner";
import './Countries.css'
import HeadingNames from '../../../components/HeadingNames/HeadingNames'
import CountryDetails from "../../../components/CountryDetails/CountryDetails";
export default class Countries extends Component{
    
    state={
        countryDetails:[],
        searchedCountries:[]
    }
    async componentDidMount(){
        var data=await axios.get("https://api.covid19api.com/summary")
        var countryDetails=data.data.Countries
        countryDetails=ArraySort(countryDetails,'TotatConfirmed',{reverse: true});
        this.setState({countryDetails:countryDetails,status:true,selectedData:countryDetails})
    }

    ChangeSortValue = e =>{
        const value=e.target.value
        let sortByReverse=true;
        if(value=="Highest"){
            sortByReverse=true
        }else{
            sortByReverse=false;
        }
        let countryDetails=ArraySort(this.state.countryDetails,'TotalConfirmed', {reverse:sortByReverse})
        this.setState({countryDetails:countryDetails,status:true})
    }
    searchCountry = e =>{
        const value = e.target.value
        const countryDetails=this.state.countryDetails

        var FindSpecificCountry=[]

        if(value){
            countryDetails.map(function(cur,index) {
                const finder=cur.Country.toLowerCase().search(value.toLowerCase())
                
                if(finder!==-1){
                    FindSpecificCountry.push(countryDetails[index])
                }
            })
            FindSpecificCountry=ArraySort(FindSpecificCountry,'TotalConfirmed',{reverse:true})
            this.setState({searchedCountries:FindSpecificCountry})
        }else{
            this.setState({countryDetails: countryDetails})
        }
        if(value.length===0){
            this.setState({selectedData:this.state.countryDetails})
        }else{
            this.setState({selectedData:this.state.searchedCountries})
        }
    }
    render() {
        
        const ChangeNumberFormat=function(val){
              return <NumberFormat value={val} thousandSeparator={true} displayType="text"/>
        }

        var countriesList=this.state.countryDetails.length> 0 ?
        this.state.selectedData.map(function(cur,index){
            return <CountryDetails
                     key={index}
                     countryCode={cur.CountryCode}

                     totalCase={ChangeNumberFormat(cur.TotalConfirmed)}
                     newCase={ChangeNumberFormat(cur.NewConfirmed)}

                     totalDeaths={ChangeNumberFormat(cur.TotalDeaths)}
                     newDeaths={ChangeNumberFormat(cur.NewDeaths)}

                     totalRecovered={ChangeNumberFormat(cur.TotalRecovered)}
                     newRecovered={ChangeNumberFormat(cur.NewRecovered)}
                   />
        }) : null;

        return (
            <div className="countries-stats">
               <h2 className="countries-stats-heading">Countries Stats</h2>
               <div className="Filtering">
                   <input type="text" placeholder="Enter Country Name" onChange={this.searchCountry}/>
                   <select className="sort-by" onChange={this.ChangeSortValue}>
                      <option>Highest</option>
                      <option>Lowest</option>
                   </select>
               </div>
               
               <HeadingNames/>

               {this.state.countryDetails.length< 1 ? <Spinner/> : null}
               {countriesList}

             {/* <CountryDetails
                   countryCode='IN'

                   totalCase="5748494"
                   newCase="837473"

                   totalDeaths="38422323"
                   newDeaths="3284"

                   totalRecovered="2324242"
                   newRecovered="2343242"

                />*/}
            </div>
        )
    }
}