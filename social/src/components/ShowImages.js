import React, {useState} from 'react'
import { Grid, IconButton, Dialog, Paper } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import './ShowImages.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const ShowImages = (images) => {

    const imgUrl = 'http://localhost:5000/images/';

    const [isModalOpen, setModalOpen] = useState(false);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

   const openDialog = () => {
    return(
    <Dialog open={isModalOpen} onClose={closeModal}>
    <DialogActions>
      <Button onClick={closeModal} color="primary">
        X
      </Button>
    </DialogActions>
    <DialogContent style={{overflow: 'hidden'}}>
      { images.length < 2 ?
      <img src={`${imgUrl}${images[0]}`} alt="primary"/>
      :
      <div style={{width: "300px", height: 'auto'}}>
      <Slider {...settings}>
        
        {images.map((image,idx)=> { return(  <img style={{display: 'inline-block'}} src={`${imgUrl}${image}`} key={idx} alt="primary"/>)})}

      </Slider>
      </div>
      }
    </DialogContent>
    
  </Dialog>
    )
   }

    const displayImage = () => {
        if (images.length === 1) {
            return (
              <div
                container
                justify="center"
                style={{
                  backgroundSize: "cover",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                onDoubleClick={() => {
                  openModal();
                }}
              >
                <img src={`${imgUrl}${images[0]}`} alt="primary"/>
              </div>
            );
          }
    
          if (images.length === 2) {
           
              return (
                <Grid container spacing={1}>
                  {images.map((image, index) => {
                    return (
                      <Grid item md={6} lg={6} xl={6} xs={6} sm={6}>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          style={{
                            width: "auto",
                            height: 400,
                            borderRadius: 5,
                            marginBottom: 2,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                          onDoubleClick={() => {
                            openModal();
                          }}
                        >
                           <img src={`${imgUrl}${image}`} alt="primary"/>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              );
            }
    
            if (images.length === 3) {
            return (
              <Grid container spacing={1}>
                <Grid item md={6} lg={6} xl={6} xs={6} sm={6}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      height: 500,
                      borderRadius: 5,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    onDoubleClick={() => {
                        openModal();
                      }}
                  > <img src={`${imgUrl}${images[0]}`} alt="primary"/></Grid>
                </Grid>{" "}
                <Grid item md={6} lg={6} xl={6} xs={6} sm={6}>
                  {images.map((image, index) => {
                    if (index !== 0) {
                        return (
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            style={{
                              width: "auto",
                              borderRadius: 5,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                            }}
                            onDoubleClick={() => {
                                openModal();
                              }}
                          >
                            <img src={`${imgUrl}${image}`} height="245px" alt="primary"/>
                          </Grid>
                        );
                      }
                    
                  })}
                </Grid>
              </Grid>
            );
          }
    
          if (images.length > 3) {
            return (
              <Grid container spacing={1}>
                <Grid item md={6} lg={6} xl={6} xs={6} sm={6}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      height: 400,
                      borderRadius: 5,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    onDoubleClick={() => {
                        openModal();
                      }}
                  > <img src={`${imgUrl}${images[0]}`} alt="primary"/></Grid>
                </Grid>{" "}
                <Grid item md={6} lg={6} xl={6} xs={6} sm={6}>
                  {images.map((image, index) => {
                    if (index !== 0) {
                        return (
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            style={{
                              width: "auto",
                              borderRadius: 5,
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              position: 'relative',
                            }}
                            onDoubleClick={() => {
                                openModal();
                              }}
                          >
                            { index ===1 && <img src={`${imgUrl}${image}`} height="245px" alt="primary"/>}
                            {index === 2 &&
                            <>
                            <img src={`${imgUrl}${image}`} style={{filter: "brightness(25%)"}} height="245px" alt="primary"/>
                             <span className='overlayText'> + {images.length - 3} More</span>
                             </>
                             }
                          </Grid>
                        );
                      }
                    
                  })}
                </Grid>
              </Grid>
            );
          }
    }

   return ( <> 
   { displayImage() }
   { isModalOpen &&  openDialog() }
   </> )
}
