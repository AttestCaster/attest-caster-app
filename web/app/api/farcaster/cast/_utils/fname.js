import axios from 'axios';

const FNameAPI = "https://fnames.farcaster.xyz";

export async function getFnameByFid(fid) {
  try {
    const response = await axios.get(FNameAPI + '/transfers?fid=' + parseInt(fid, 10)); //Todo:: verify format
    if (response.status = 200) {
      return response.data
    } else {
      console.error('faild to get cast by id', fid, castHash, response)
      return {}
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get fname by fid')
  }
}