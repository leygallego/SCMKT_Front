import { GET_CONTRACTS, GET_USERS, POST_SING_UP, SEND_LOGIN } from "../actions";


const initialState = {
    users: [
        { id: 1, name: "Benito", last_name: "Wyldish", username: "benito", email: "benito@gmail.com", birthday: "11/03/1955", country: "Haquira", password: "benito", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJwSURBVDjLpVNNaxNRFD2TzOSTpFgZCg0JJPEDCaK48wNaEzS4cOlCsIgEXHWrCC3FRQXBP+BWCrpyKcZImhZmYdwVUaolIWXSGGPJpLHNJJnJjPdNnTBFXDlwuPe9eefcc98HZ5om/ufj7aRcLhdHo1Fa13VQBItOaJrmzFdzuVyG8TjmgMgzfr9/LZFIYDgc/lXF6VIQBJRKJciynJmfn1+1HJDq0uTkJJrNJrxe75jkJLK8Xq8jHA4jmUyiWq0u0PQqJ0nSTCAQWIvFYuh2u5YDG8wuI3IcB7fbbVUPhUIIBoMoFouo1WoZnvpZEkXR6pEt8vl8FuzqTicsGoaBfr+PVCqFra2tBZ5VUVUV7XYbg8FgvIhtJIv22J5jY57nMTExYTlkAmlWWVEU9Hq9I4R/CbAWIpEIc53m7eMpFApHBJyWnTmLjMxOzHaAr419tKayWLw7i82WjoDHhV/tH/jwZQf13X1cPR/FyUQc7Z6BM1MCll+UIFV6loCLOagpJu5lU2h0DfSGJrw8Z5GvnRLw4LqI9Q0Zfg+HgW5iW9GxNHcR8h7GAvnKdh0+Dw9tdLjbLg6YPRfF+28anhV+YoZydXj4TxsBfc1Eq9Vie5K3buLtp+/uXElNr1y+cBq6YWI67IZfcEFwgxwZ2Gho6Kq0kaQRPcbThZLxWqo8Jr0nrj8X7a30uZGX6zs4cZy3yCMSPqCqHdWEcmAg7HNR/zw6u01G/kicl68eZXXOviTkIk5hmXDr/o2UcDYuQvAIGJDd74qKzl4Xz9980lkxwkMib44fk/2RiEDhEmGOcJMgsjUEmbBOWCGsEXn84n4DYCewx+p/CvMAAAAASUVORK5CYII=", status: "active" },
        { id: 2, name: "Eber", last_name: "Mithan", username: "eber", email: "eber@gmail.com", birthday: "10/10/1975", country: "Wenjiao", password: "eber", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJYSURBVDjLY/j//z8DJRhMmJQd+x89/W4IRQbY1x5L8590dzmy5PuIqC4gfvA+PPIyEMfhNqD06H+L9gfG9p33/jr23OMEiX30DTj8yT/oFxCf+hAYfBeIfwPxIyBWwjSg5Mh/tYZHzDr1D34aND7Y9tXOsf2Lg/O/z85uNjCFn908lT56eH985xXwzXvygwYUA4yLD/9Xcm+QlS572JWesP7XVyOL79/MLKci22Rc/6DXvPH+X8um+79t2u7/tOu4/w9ugFHxof8wha+1LP89NHT9iaxZIf/BCpWie7/Vi+/N/25kqvrN2Oz/suiO6QgDig6ADfgtJrX0p6TMb1u/Xd+5Eh9M4k16yCyQdH+HYOK9H6JJd+tgBv7U0j3wXVvvA9wAg8J9/6sNAvT/8gr++8Mn1MYQ8aCFIfzBf6bwB3+Zwx/8Ywu7H44e+j8VVX4hDMjf+/8/I6v/fya2OyghHHCn3GuRw3TvJTZnPJdYnXVbbA436Le49Aa4Afp5u///ZGAJ+c3AIg5T4DXT0stjpuULj1nmD9xmW6x1nWu2z2W+6RenBcbxIHmga6XgBujl7vw/R1TDAabZscNommOn0UeHLsNFDj2GPDBxh37DDrtJ+u8x0oFu9vb/liU6khal2jPNS3UfAem3FmU6Gej+tqjX5rBo0rln1qI9GdWArG3/jTI0/Q0z1N3UAyxdgTQ4NQpreMjCFAqpOoHZRvnqUhpROhmmxRo8cAO0M7f8187Y/F8rYxMQb/yvlbYBiNf/1wTh1HX/NUA4ZS0Ur/mvkbwajOEGUIIBf5BxjDvwFIUAAAAASUVORK5CYII=", status: "active" },
        { id: 3, name: "Emma", last_name: "Blaik", username: "emma", email: "emma@gmail.com", birthday: "02/10/1987", country: "Zamboanga", password: "emma", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG5SURBVBgZpcG7b41xAMfhz/v2SJ1qI2nVedXtD0ClsdpIdDARBlKRaEIMLP4OCZNYJGIQl0EQiYnJytSRRA8nLnGrSy+/z1dHObH1eapLL86FVUlIQgyX91+v+I+zT2aiQcUSVGpWdQa3sL29kxhMmovPZ0Ofs09momkQOu2GzlAHi9RJSEJnsGFrewct1vU09LOIxd6m9jhbh7cxULVQqWPo/X7Pm4U3DFcb2L1xkij9imFq8z5GWiN0v3d5/fk1pUhtQimlefezy2CrTZUKS+hnkQTWt4bofuuiNhapknDh2ZnEoEElhmvTNyv+cere8ahosIjKnZkHVZWEtahZo5o1qlmjFqtmH52MBouoaLh17G7FP47cOJwYLKJB5fH5p1U9++hkLDYDGWDX2B4mx6ewSD9LmJzYy66J3ahomumrB1NbRNMbWz/Ot99fWV5ZwiL9VBbLEl9+fWHT8DhV6KnUFmmGJhgdHOXH4gKv3r9EpZ9F5ubnWFpeobOxw+jwGDG0ivJn+Q/zi/N8XPhAKTZqjz4aiovN/Ke3PUshBhOqE7ePRsUiGlTun35Y8R+HrhxIDCbEkIS/gKBKja+GF3wAAAAASUVORK5CYII=", status: "active" },
        { id: 4, name: "Leyder", last_name: "Combes", username: "leyder", email: "leyder@gmail.com", birthday: "10/09/1987", country: "Vigan", password: "leyder", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGKSURBVCjPPVFNSwJRFH1SPyR00V+xIqJVREIEUm6VFm1ahFvLiiI/oE1QRlQgUtgHlKhp41dlokVFpKmjo41M69MZlbi8d+Gec8897z4BoYcwREdj67fJsHqunkp728cjvToR/UoYs66I9og6OvjEA0o41FzeXWOfkB+6CZQIqajhGz/MRWQRh+dg3USCMNyvvbG3xVDQ5JFRJkXFNZZ8JNyZw1qbfTrUZuhwk1mihktbGRNxd45QqxvtroqMBip4pZcYHB4Rkhr44oh2H9bzJ/srHBLEYkoE1RZF5X8PLZ4qnmm3SqsOlQSpC1X6KhU+ssacwxlvW0ccSWnObOCdkK7ygUcSmijQ5BNsKeH1FMnOkK2wWOCtII9LDlCxBeuWCJh3tTynKVRJItG1meUOyqTMaTMT3KTTdwUNUYa+i3uCMvcSgR+2VTFAwo5xcz/EV6dps06VKLu/EMDUyeRw/7NcRoffqcXp+4I2X+DB9K/VbTH9/6Yey6MLfrtkV62d2cz8hmVcDPbqfy6NlFRFHkA7AAAAAElFTkSuQmCC", status: "active" },
        { id: 5, name: "Pablo", last_name: "Dollman", username: "pablo", email: "pablo@gmail.com", birthday: "09/12/1993", country: "Stockholm", password: "pablo", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJcSURBVDjLpZPNS9RRFIaf+5tx/JqxUZGKQtEkyJBKw1ZhG0mSFkW1aVW7Wgpusv4CoX20KIgIKowgZSgwrIVghFQbM2swQRM/xmx05jf33nNaBJNWtKizPJzzcDjv+xpV5X8q+mvDPTdxVXpV6BahQxVUGBchpcL1xEnNbp43my9wz02nCrdMfV+jSXagsRpQj+aW8JkJwg8DaREuVJ/S0d8AbsSc0mTnYLDjPFqxDb8xiYTLqMuDKSMoa8bYgPDzA8KF0dN15/RREWBHTI0qM5HWe3EJ1vD5NNhviAtRn/8BEcWU1hMpbeXr2MWsCA07z+tKAKBCb9DQH9cYSJgGt87I4yWQAvgCL56B2Cxu7R0+/EjFvv64eHoBAgARekz1ESSfRl0OFcuxE+WoWNRbjnZmUQlRm8Wtviaa3It4eooqiNBCaRWSW2X6bTWYBJhf5FFF3Qq7a54CId7TWASokFOXj+EdNQ3tVNTuwQSRrfviWV94g64NgSoiRH5e4EljcwchRmU8R2J7M0G0ZAvA2xC/PIwJKhAfxYZMb/7BkF2awMTqCcJR7MYcsNmhil37CMv3iVYdILc0gy0wVJQxM2jqRPgUP3InLvY9bn2GSLKHkmQbqCdcfElh9iaR8l2YquPMPLmUdZamQ1d0sWikxfvmTLSu60FZ/WmIfMNlXuFzc6jLY6IJIomDeJrITA6TmUqdbevXh79Zef6u6RLPjcqWvsZY7X6CkgDE4ULP+vwUX8YG0s5yuf2qpv6YBYDZ2yYunj4Rur2nwxXAWcadJeUsA4ev/SVM/1LfAVOtXW4xpbWpAAAAAElFTkSuQmCC", status: "active" },
        { id: 6, name: "Cherey", last_name: "Cottie", username: "ccottie4", email: "ccottie4@scientificamerican.com", birthday: "02/04/1999", country: "Sanchahe", password: "1caZy9B", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGcSURBVDjLxVM7SEJRGP5vmVfpAWGFERJUONQWLtEQOUQRbUK09IDW1mp1KKPBsdGlWqKIqGiLoq0aggqxraFARMpX95535xxCNLouDh04cM7//3yvwzGEEFDPaoA6l6vyEj3MaDmcc0CMX23NdY9X9iPxlxijsHK8GmxxUMAh1O+BAb8bEKZVnZntVMyisFYiotnRgkU4UMaByC0Hy/XpzWQ80GGuTwy1GUULO1tQrIQJQBLIsriuTW4kE71d3qWg3wNM9gqIOYeoWDHlGuALYQhHn/cCPnNpsMeEjyIBW9bzP8B/KlCsSAJ4TQNyiI0M97WaPe1NkM4TyJco+FpcQC3irECxYsVuM/iyaBFTplltzHU+6sx/KagCKCDlX0A6R5TXp5O77NHl4wd43QYYoOwJEAg7A6iEEZHsMijpVbzuhCLPqdzBzcMnNHsadT7CZrUUMB2gjVnZ6/v+6GzqMbt7e5/V+fBaIaqEbfUKEqByMH0enu8cu+AE0QVBqDOAYk2cvUmfUiqrHsxcTy36QqcE3K7lyrrx77/xG/TSBY2ALCinAAAAAElFTkSuQmCC", status: "active" },
        { id: 7, name: "Markos", last_name: "Roylance", username: "mroylance5", email: "mroylance5@ucsd.edu", birthday: "10/07/1991", country: "Kijini", password: "T58O2in", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB/SURBVCjPpVFBDkBADJyKJ3mEk1d4goPPeYDgN2QtidFdFidZ0UnbZDszbbJCvEeCv4TUlVr3EKvCKmYYhau9AMIYh4oLFq8N6lYCIc6h5PzYbLyTVc8p+oaCQWu81mL8eEPzYNEnsWnP5SQA2fnsBkcSw+1AdJfqGN4hv39zB9EXSdykB4lxAAAAAElFTkSuQmCC", status: "active" },
        { id: 8, name: "Hewet", last_name: "Coneybeer", username: "hconeybeer6", email: "hconeybeer6@google.it", birthday: "11/03/1951", country: "Wangtuan", password: "9TrLMLfgIZ", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI2SURBVDjLpVNNaBNBFP42aZNqXEw1iv0xFUpBLWmrF0v1IpKiKOohBwUvhYDgz0G8eIugYBBFD+JBpV49ekqpHoQklGBpzNb0UIwkoFarIvnT5m9mfDPJhlJTEVx4vN3Z9/28eTOaEAL/87StXYjH409rtdq5arXaRhmUVVQqFZmf+Xy+sy0JDMPYTIAnTqfTZ7dvRJlA4BzKH7ns7HRienrqDH39SZBIJI5KsMvl6nE4HEhnPkGqcy7ABSciAUZk5XK5dQtUPOV2u9XCykoJVQK/NeaIgDfDO35MtdGSQPZos9mQz+fryoxh7+CIUhcNdbnZ6zqQzIxAskgORVo3ErOUmVKX/7qOn/q7g/peCVUsCQY9+5W66UKsswcW04FJoEikMqv3/k1PYzJ7H3xVXcsWmuAG0FSfXHyMn4UaEpkwcttSOH/vtCj8yhWyxR+3Q7eMm4pAWjNPpATxhmVOa1e2XsciZpEpxeA9fBC9WwbwauG5HktGboxe6nY2W5BTsFqtdWXGV41QIPk5jJHdw2AWhuEuL5hWxahnTEIvWhoOXkciERSLRei6jo4NdjqBmiJi5OJ7YRnt2iac3HNZubx65BH6tw/J1w5F4Pf7D6RSqROhUGguGg3DbtOwq68XbncP+nZ2I1/MYmFpBsGXE4og+GIC77/Oy9eStvY2BgKBcRrrHQqPeZk+8CTa+5cxNnQIAzv24d2XN5iZj+JjOndX+9frTBsWpHSBQqcoUDyMPVi69hviC4VQKCIpUgAAAABJRU5ErkJggg==", status: "active" },
        { id: 9, name: "Jaclyn", last_name: "Bourgaize", username: "jbourgaize7", email: "jbourgaize7@ftc.gov", birthday: "07/01/1973", country: "Atbasar", password: "AFpY8KQgRc", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACzSURBVDjL7dI9C0FxHMXx8zruG2SSUjKgXwklw2WxSB4yGC2iDFyDpwj1T1LK00jq+hduOt6AwU02w1k/deoLkvhm+APvAVRpoEpBxVEoaoX8SZDbG24AkcWTrZ3D+ubByPBCmEv5HCjfVXPrMNq/0WdpZuaaSI3U50DhomrrG/2WpqdzZWJiE7G2CyB3lPDgTHOmGR/bDHUPRLDk4kJ2ZSA9FSR7CtJQCOQF3rjxL/FHwAu8X+2ABKJChQAAAABJRU5ErkJggg==", status: "active" },
        { id: 10, name: "Carlye", last_name: "Lelande", username: "clelande8", email: "clelande8@craigslist.org", birthday: "08/07/1998", country: "Judaydah", password: "JEJLdCpvW9M7", wallet: "", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFhSURBVDjLpZMxbtZAEIW/N/bP7w4aSiQuQEODEFdIAVI6KFJwgeQenAEBFQVU1CBOkAsgroDSRMof77wUa68tK5GQstqVd1fz3rw345Vt7jN6gM8/zj9k6u3lIYer8ZaoTY5dD8OOj+9fPz/tAdJ6d/TqyeNhGCR1eMIkAMIGez6bMl7z/eefE6ASXF7lfr8f9OX3P0oxY2b9lmQspkznkibTnB0/paQEEACHESI6hKhTTa7mrepegsxNDWhyadAaLIQJCQssiAA3kxuCBpKRRMhkCBlCVW8a1p1rBPYCXjKKTrNRkOvCuougkkTULA4tHRQ4IVb1aQSeCJbMJlZgTdlTqsRwt4LqddUFJms2YWPfpsBugRFTRWffEkojs4CnH6sRaLoNQbImEWlXZV7L3xRx2OmCvH745sUj0Ozd89wMMY4H+k5uBA96ff326+/LQ/Gz/3mcfQe74FNt7T2f8w1Fi68/h3owMgAAAABJRU5ErkJggg==", status: "inactive" }
    ],
    contracts: [
        { id: '1a', name: "A contrat", value: 0.08379028, detail: "view details" },
        { id: '1a', name: "B contrat", value: 0.08379028, detail: "view details" },
        { id: '1a', name: "C contrat", value: 0.08379028, detail: "view details" },
        { id: '1a', name: "D contrat", value: 0.08379028, detail: "view details" },




    ],
    newUser: [
        // { name: 'Leyder Gallego', country: 'Afghanistan', email: 'leygallego@prueba.com', wallet: '09asdf09asdf0a9sd8fasasdf', password: 'ASDFGHJKLÑ' },
        // { name: "Eber Hernandez", country: "Comoros", email: "jaimito@hotmail.com", wallet: "dfgsdfgsdfgsdfgsdgfgsfgsfgsdg", password: "1234" }
    ],
    user: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_CONTRACTS:
            return {
                ...state,
                users: action.payload
            }
        case POST_SING_UP:
            // console.log('POST_SING_UP', action.payload);
            // if (
            //     action.userRegisterObject.username === ""
            //     || action.userRegisterObject.country === ""
            //     || action.userRegisterObject.email === ""
            //     || action.userRegisterObject.wallet === ""
            //     || action.userRegisterObject.password === ""
            // ) {
            //     return state;
            // }
            // return {
            //     ...state,
            //     newUser: [...state.newUser, action.userRegisterObject]
            // }
            return{
                ...state
            }
        case SEND_LOGIN:
            console.log('SEND_LOGIN:::::', action.payload)
            const { name, password } = action.payload;
            console.log('Destructurado', name, password)
            state.newUser.map(
                element => {
                    if (element.name === name && element.password === password) {
                        console.log('Si hay login', element.name, element.password);
                        return {
                            ...state,
                            user: {
                                name,
                                password
                            }
                        }

                    }
                    return null;
                }
            );
            return state;

        default: return state
    }
}
