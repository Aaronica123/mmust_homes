import { Button, Text } from "@radix-ui/themes";
import { Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const styles = `
.hc-card {
  --hc-900: #0f3d24;
  --hc-700: #166534;
  --hc-600: #15803d;
  --hc-500: #16a34a;
  --hc-100: #dcfce7;
  --hc-ink: #10251a;
  --hc-muted: #5b6f63;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 18px;
  padding: 14px;
  background: #fff;
  border: 1px solid #d7ecdd;
  border-radius: 14px;
  box-shadow: 0 10px 24px -16px rgba(15, 61, 36, 0.4);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.hc-card:hover {
  border-color: #8fc4a0;
  box-shadow: 0 16px 30px -16px rgba(15, 61, 36, 0.5);
}
.hc-media {
  flex: 0 0 170px;
  min-height: 150px;
  overflow: hidden;
  background: var(--hc-100);
  border-radius: 10px;
}
.hc-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hc-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  padding: 2px 4px 2px 0;
}
.hc-details { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.hc-title {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--hc-900);
}
.hc-line {
  font-size: 15px;
  line-height: 1.4;
  color: var(--hc-muted);
}
.hc-title, .hc-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hc-actions {
  display: flex;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid #e4f2e8;
}
.hc-actions button {
  flex: 1;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 520px) {
  .hc-card { flex-direction: column; }
  .hc-media { flex: none; width: 100%; height: 170px; min-height: 0; }
  .hc-body { padding: 0 2px 2px; }
}
`;

export default function Cardimage({ text = [], clk }) {
  const [coord, setcoord] = useState({ lat: "", long: "" });

  const na = async () => {
    navigator.geolocation.getCurrentPosition(async (value) => {
      setcoord({ lat: value.coords.latitude, long: value.coords.longitude });
    });
  };

  useEffect(() => {
    na();
  }, []);

  const [title, ...details] = text;

  return (
    <>
      <style>{styles}</style>
      <article className="hc-card">
        <div className="hc-media">
          <img
            src="https://i.pinimg.com/736x/3c/55/f4/3c55f4e4cf85f4e755cda28b9c0add3e.jpg"
            alt="house"
            loading="lazy"
          />
        </div>

        <div className="hc-body">
          <div className="hc-details">
            {title !== undefined && <h3 className="hc-title" title={String(title)}>{title}</h3>}
            {details.map((data, index) => (
              <Text key={index} className="hc-line" title={String(data)}>
                {data}
              </Text>
            ))}
          </div>

          <div className="hc-actions">
            <Button type="button" color="green" variant="solid" size="2">
              <Heart size={16} />
              Shortlist
            </Button>
            <Button type="button" color="green" variant="outline" size="2" onClick={clk}>
              <MapPin size={16} />
              Location
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}