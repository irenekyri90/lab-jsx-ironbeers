const React = require('react');
const Layout = require('./Layout');
const BeerCard = require('./components/BeerCard');

function RandomBeers (props) {
    return (
        <Layout>{
            
            <BeerCard beer={props.responseFromApi[0]}/>

            
        }</Layout>
    )
}
module.exports = RandomBeers;

