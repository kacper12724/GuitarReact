import React, { Component } from 'react';
import TablatureDisplay from '../TablatureDisplay/TablatureDisplay';
import TablatureSearch from '../TablatureSearch/TablatureSearch';
import PageScroller from '../PageScroller/PageScroller';


class ControlPanel extends Component {
    render() {
        return (
            <div>
                <TablatureSearch />
                <TablatureDisplay />
                <PageScroller />
            </div>
        )
    }
}

export default ControlPanel;