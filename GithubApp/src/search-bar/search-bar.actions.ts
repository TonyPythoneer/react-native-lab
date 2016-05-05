import * as C from "./search-bar.constants";
import "whatwg-fetch";

const actions = {
    completeSearch: (text) => (dispatch) => {
        dispatch(actions.beginSearch())
        fetch(`https://api.github.com/users/${text}`)
            .then(checkStatus)
            .then(parseJSON)
            .then(successfulHandle)
            .catch(errorHandle)

        ///

        function checkStatus(res: Response) {
            if (res.status >= 200 && res.status < 300) {
                return res
            } else {
                let error: Error = new Error('')
                throw error
            }
        }

        function parseJSON(res: Response) {
            return res.json()
        }

        function successfulHandle(data) {
            let { login, avatar_url,
                repos_url, public_repos,
                followers_url, followers} = data
            dispatch({ type: C.COMPLETE_SEARCH, status: 'ok', data })
        }

        function errorHandle(e) {
            console.log(e);
            dispatch({ type: C.COMPLETE_SEARCH, status: 'error' })
        }

    },
    beginSearch: () => {
        return { type: C.BEGIN_SEARCH, status: 'wait' }
    }
}


export default actions;
