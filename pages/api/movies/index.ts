import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const options = {
  method: "GET",
  url: "https://streaming-availability.p.rapidapi.com/search/basic",
  params: {
    country: "us",
    service: "netflix",
    type: "movie",
    page: "3",
    output_language: "en",
    language: "en",
  },
  headers: {
    "X-RapidAPI-Key": "fa63805bfcmsh671c6467dc9f606p14ed5ajsn65862dd931c8",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.request(options);
    res.status(200).json({ data: response.data.results });
  } catch (error) {
    res.status(500).json({ message: "Getting movies failed." });
  }
};

export default Handler;
