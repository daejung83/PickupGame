import isodate from '@segment/isodate';

import config from '../config/config';

/**
 * convert iso to date format
 * @param {'2017-12-12T04:06:07.000Z'} iso 
 * @return {'2017 Dec-12 04:06'}
 */
export const isoToDate = (iso) => {
    let result = 'Date: ' + iso.getUTCFullYear() + ' ' +
                config.Month[iso.getUTCMonth()] + '-' +
                iso.getUTCDay() + ' Time: ' +
                'Hour:' + iso.getUTCHours() + ' ' +
                'Minute:' + iso.getUTCMinutes();
    return result;
}