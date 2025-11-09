const settings = require("../../settings.json");
let baseUrl = settings.apiSettings.baseUrl;

export async function GetUpcommingLaunches(
  searchQuery = "",
  status = null,
  limit = 100,
  offset = 0
) {
  // Fetch upcoming launches from TheSpaceDevs API and map to a simplified shape.
  const url = `${baseUrl}/launches/upcoming?mode=list&limit=${limit}&offset=${offset}&search=${searchQuery}&status=${
    status || ""
  }`;

  return await fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        const text = await response.json();
        return {
          error: `Launches fetch failed: ${response.status} ${response.statusText} - ${text}`,
        };
      }

      const data = await response.json();

      if (data.results === null || data.results === undefined) {
        return { error: "No upcoming launches found." };
      }

      return mapListLaunches(data);
    })
    .catch((error) => {
      return { error: error.message || "Unknown error occurred during fetch." };
    });
}

export async function GetLaunchById(launchId) {
  const url = `${baseUrl}/launches/${launchId}`;

  return await fetch(url).then(async (response) => {
    if (!response.ok) {
      const text = await response.json();
      console.log("Error response text:", text);
      return {
        error: `Launch fetch failed: ${response.status} ${response.statusText} - ${text}`,
      };
    }

    const data = await response.json();

    if (data === null || data === undefined) {
      return { error: "Launch was not found" };
    }

    return mapLaunchDetail(data);
  });
}

export async function GetStatuses() {
  const url = `${baseUrl}/config/launch_statuses/`;

  return await fetch(url).then(async (response) => {
    if (!response.ok) {
      const text = await response.json();
      console.log("Error response text:", text);
      return {
        error: `Launch fetch failed: ${response.status} ${response.statusText} - ${text}`,
      };
    }

    const data = await response.json();

    if (data === null || data === undefined) {
      return { error: "Statuses were not found" };
    }
    return data.results.map((status) => ({
      id: status.id,
      abbrev: status.abbrev,
    }));
  });
}

function mapLaunchDetail(data) {
  return {
    id: data.id,
    name: data.name,
    status: data.status?.name,
    window_start: data.window_start,
    window_end: data.window_end,
    imageUrl: data.image?.image_url || null,
    provider: {
      name: `${data.launch_service_provider?.name} (${data.launch_service_provider?.abbrev})`,
      country: data.launch_service_provider?.country[0]?.name,
    },
    mission: data.mission?.description,
  };
}

function mapListLaunches(data) {
  const launches = (data.results || []).map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status?.abbrev,
    startwindow: item.window_start,
    endwindow: item.window_end,
  }));

  return launches;
}
