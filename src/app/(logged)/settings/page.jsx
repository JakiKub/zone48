import SettingsContent from "../_components/SettingsContent";

import { Suspense } from "react";

const Settings = () => {
    return (
        <Suspense fallback={<main className="settings">powoli koncza mi sie pomysly na te fallbacki...</main>}>
            <SettingsContent/>
        </Suspense>
    )
}

export default Settings