online lecturers

.body__icons > .MuiSvgIcon-root{
    
}

String -> Integer => parseInt(string);

// CAROUSEL

import React, { Component } from 'react';
import Carousel from "react-material-ui-carousel";

export class Projects extends Component {
    render() {
        return (
            <div id="projects">
                <div className="section-title text-center">
                    <h2>Projects</h2>
                </div>
                <Carousel navButtonsAlwaysVisible="true">
                    {this.props.data ? this.props.data.map((item, i) => (<div key={`${item.title}-${i}`}>
                        <div className="row">
                            <div className="col-xs-12 col-md-6"> <img src="img/about.jpg" className="img-responsive" alt="" /> </div>
                            <div className="col-xs-12 col-md-6">
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>)) : "Loading....."}
                </Carousel>
            </div>
        )
    }
}

export default Projects

            /* LOADING ICON */
            this.setState({ isloading: true })

            this.setState({ isloading: false })            

            if (this.state.isloading)
            return (
                <Container>
                    <div className='loadingIcon'>
                        <img src='https://loading.io/mod/spinner/camera/index.svg' alt='loading...' />
                    </div>
                </Container>
            )

            return {
                {/* Main code gose here */}
            }

            
            /* Loading button component */

            <Button style={{ backgroundColor: 'blue' }} onClick={() => setLoading(true)}>
            {(loading) ? <CircularProgress style={{ color: 'white' }} size={20} thickness={8} /> : 'UPLOAD'}
        </Button>            