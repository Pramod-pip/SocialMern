import React from 'react'
import { Grid } from "@mui/material";
import './ShowImages.css';

export const ShowImages = (images) => {
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
            // onDoubleClick={() => {
            //   setShowImage(images[0]);
            // }}
          >
            <img src={`http://localhost:5000/images/${images[0]}`} alt="primary"/>
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
                      // onDoubleClick={() => {
                      //   setShowImage(image);
                      // }}
                    >
                       <img src={`http://localhost:5000/images/${image}`} alt="primary"/>
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
                // onDoubleClick={() => {
                //   setShowImage(images[0]);
                // }}
              > <img src={`http://localhost:5000/images/${images[0]}`} alt="primary"/></Grid>
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
                        // onDoubleClick={() => {
                        //   setShowImage(image);
                        // }}
                      >
                        <img src={`http://localhost:5000/images/${image}`} height="245px" alt="primary"/>
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
                // onDoubleClick={() => {
                //   setShowImage(images[0]);
                // }}
              > <img src={`http://localhost:5000/images/${images[0]}`} alt="primary"/></Grid>
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
                        // onDoubleClick={() => {
                        //   setShowImage(image);
                        // }}
                      >
                        { index ===1 && <img src={`http://localhost:5000/images/${image}`} height="245px" alt="primary"/>}
                        {index === 2 &&
                        <>
                        <img src={`http://localhost:5000/images/${image}`} style={{filter: "brightness(25%)"}} height="245px" alt="primary"/>
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
