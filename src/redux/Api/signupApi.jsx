import axios from 'axios'


const SignupApi = async (payload) => {
    try {
        let response = await axios({
            method: 'post',
            url: `${process.env.API_END_POINT}auth`,
            headers: {
                'Content-Type': 'application/json',
            },

            data: payload
        })

        return response
    } catch (error) {
        return error
    }

}

export default SignupApi