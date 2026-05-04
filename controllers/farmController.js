exports.createFarm = async (req, res) => {
    try {
      const { farmName, farmAddress } = req.body;
      // Your logic here...
      res.status(201).json(newFarm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getAllFarms = async (req, res) => {
    try {
      const farms = await Farm.find(); // Assuming you have a Farm model
      res.status(200).json(farms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteFarm = async (req, res) => {
    try {
      const { id } = req.params;
      await Farm.findByIdAndDelete(id); // Assuming you have a Farm model
      res.status(200).json({ message: "Farm deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  