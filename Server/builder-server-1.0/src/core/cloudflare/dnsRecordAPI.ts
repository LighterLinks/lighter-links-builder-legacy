export async function generateDNSRecord({
  isAppDNS,
  name,
  comment,
}: {
  isAppDNS: boolean;
  name: string;
  comment: string;
}) {
  const Zone_ID_1 = process.env.ZONE_ID_1;
  const Zone_ID_2 = process.env.ZONE_ID_2;
  const Token = process.env.CLOUDFLARE_TOKEN;
  const IpAddress = process.env.IP_ADDRESS;

  const url = isAppDNS
    ? `https://api.cloudflare.com/client/v4/zones/${Zone_ID_2}/dns_records`
    : `https://api.cloudflare.com/client/v4/zones/${Zone_ID_1}/dns_records`;
  const payload = {
    content: IpAddress,
    name: name,
    proxied: true,
    type: 'A',
    ttl: 3600,
    comment: comment,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify(payload),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    success: data.success as boolean,
    recordId: data.result.id as string,
  };
}

export async function deleteDNSRecord({
  isAppDNS,
  recordId,
}: {
  isAppDNS: boolean;
  recordId: string;
}) {
  const Zone_ID_1 = process.env.ZONE_ID_1;
  const Zone_ID_2 = process.env.ZONE_ID_2;
  const Token = process.env.CLOUDFLARE_TOKEN;

  const url = isAppDNS
    ? `https://api.cloudflare.com/client/v4/zones/${Zone_ID_2}/dns_records/${recordId}`
    : `https://api.cloudflare.com/client/v4/zones/${Zone_ID_1}/dns_records/${recordId}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Token}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data.success as boolean;
}
