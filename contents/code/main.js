registerShortcut("MinimizeAllExceptCurrent", "Minimize all windows except current", "Meta+S", function () {
    var candidates = workspace.clientList();
    var currentDesktop = workspace.currentDesktop;
    var activeClient = workspace.activeClient;

    var relevantClients = candidates.filter(function (client) {
        if (client.desktop !== currentDesktop) {
            return false;
        }
        if (client.onAllDesktops) {
            return false;
        }
        if (!client.minimizable) {
            return false;
        }
        if (client === activeClient) {
            return false;
        }
        return true;
    });

    var minimize = relevantClients.some(function (client) {
        return !client.minimized;
    });

    relevantClients.forEach(function (client) {
        var wasMinimizedByScript = client.minimizedByScript;
        delete client.minimizedByScript;

        if (minimize) {
            if (client.minimized) {
                return;
            }
            client.minimized = true;
            client.minimizedByScript = true;
        } else {
            if (!wasMinimizedByScript) {
                return;
            }
            client.minimized = false;
        }
    });
});
