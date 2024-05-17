import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase"; // Assuming you have a firebase config file
import { useNavigate } from "react-router-dom";

function Home() {


  return (
    
    <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1640561676095!2d106.79814847609639!3d10.875123789279707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1715862724373!5m2!1svi!2s"
         width="600" height="450"
           allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
}

export default Home;
