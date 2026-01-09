import Appointment from '../models/Appointment.js';
export const createAppointment = async (req, res) => {
  try {
    const { name, phone, email, date, time, location, carDetails, services, otherService } = req.body;

    if (!name || !phone || !email || !date || !time || !location || !carDetails || !services) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const { maker, model, year } = carDetails;

    const newAppointment = new Appointment({
      name,
      phone,
      email,
      date,
      time,
      location,
      carDetails: { maker, model, year },
      services,
      otherService,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAppointment =async (req,res) => {
    try{
        const appointments = await Appointment.find().sort({ createdAt : -1 });
        res.status(200).json({ appointments });

    }catch(error){
        res.status(500).json({ message : "Server error ", error : error.message});
    }
}

export const approveAppointment = async ( req, res) => {
  try{
    const appointment = await Appointment.findById(req.params.id);

    if(!Appointment ){
     return res.status(404).json({ message :"Appointment not found"});
    }
    appointment.status = "Approved";
    await appointment.save();
    res.status(200).json({ message : "Appointment approve successfully", appointment});
  
  }  catch(error){
    res.status(500).json({ message : " Server error", error : error.message});
      
    }
}
export const completeAppointment = async ( req, res) => {
  try{
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: " Appointment not found" });
    }
    appointment.status = "Completed";
    await appointment.save();
    res.status(200).json({ message: " APpointment completed successfully", appointment });

  }catch(error){
    res.status(500).json({ message : "Server error", error : error.message});
  }
}
export const cancelAppointment = async ( req, res) => {
  try{
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: " Appointment not found" });
    }
    appointment.status = "Cancelled";
    await appointment.save();
    res.status(200).json({ message: " Appointment cancelled successfully", appointment });
  }catch(error){
    res.status(500).json({ message : "Server error", error : error.message});
  }
}