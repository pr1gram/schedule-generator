import type { NextPage } from "next";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/outline";
import { ColorPicker } from "@components/ColorPicker";
import React, { useEffect, useState } from "react";
import { hexToRgbA } from "@utils/hexToRgb";
import classnames from "classnames";
import Head from "next/head";
import {Preview} from "@components";

const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
};

const Theme = {
  Purple: {
    name: "The Witches’ Craft",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#8861DC"),
    t2: hexToRgbA("#B99CF8"),
    c1: hexToRgbA("#B99CF8"),
    c2: hexToRgbA("#A787EC"),
    c3: hexToRgbA("#916CDF"),
    c4: hexToRgbA("#8860DC"),
  },
  Red: {
    name: "Bloody Mary",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#D17474"),
    t2: hexToRgbA("#E28B8B"),
    c1: hexToRgbA("#EBB8B8"),
    c2: hexToRgbA("#E49E9E"),
    c3: hexToRgbA("#E08484"),
    c4: hexToRgbA("#D17474"),
  },
  Blue: {
    name: "Fairy Godmother",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#53ABDC"),
    t2: hexToRgbA("#88CBF1"),
    c1: hexToRgbA("#9CD7F8"),
    c2: hexToRgbA("#88CBF1"),
    c3: hexToRgbA("#65BDEE"),
    c4: hexToRgbA("#53ABDC"),
  },
  Pink: {
    name: "Tooth Fairy",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#D2488B"),
    t2: hexToRgbA("#EAA4C6"),
    c1: hexToRgbA("#EDB7D2"),
    c2: hexToRgbA("#EAA4C6"),
    c3: hexToRgbA("#E387B3"),
    c4: hexToRgbA("#DD6EA5"),
  },
  Orange: {
    name: "Jack-O’-Lantern",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#EA984D"),
    t2: hexToRgbA("#F8BA82"),
    c1: hexToRgbA("#F8BA82"),
    c2: hexToRgbA("#F1AB6A"),
    c3: hexToRgbA("#EA984D"),
    c4: hexToRgbA("#DD8E44"),
  },
  Black: {
    name: "Dracula Untold",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#828282"),
    t2: hexToRgbA("#A8A8A8"),
    c1: hexToRgbA("#ADADAD"),
    c2: hexToRgbA("#989898"),
    c3: hexToRgbA("#828282"),
    c4: hexToRgbA("#7C7C7C"),
  },
  Green: {
    name: "Mr. Frankenstein",
    bg: hexToRgbA("#FFFFFF"),
    t1: hexToRgbA("#96C060"),
    t2: hexToRgbA("#B5D889"),
    c1: hexToRgbA("#BDDB99"),
    c2: hexToRgbA("#B5D889"),
    c3: hexToRgbA("#A8D174"),
    c4: hexToRgbA("#96C060"),
  },
};

const Home: NextPage = () => {
  const bgColors = ["bg-yellow-50", "bg-green-50", "bg-blue-50", "bg-pink-50"];

  const getRandom = (arr: Array<string>) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const [bgColor, setBgColor] = useState(getRandom(bgColors));
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [preset, setPreset] = useState(false);
  // const [qualityPanel, setQualityPanel] = useState(false);
  const [room, setRoom] = useState("");
  const rooms = [
    276, 277, 278, 341, 342, 343, 344, 345, 437, 438, 446, 447, 448, 65, 66, 661, 662, 664, 665, 666, 667, 70, 71, 72,
    834, 835, 842, 843, 844, 845, 846, 942, 943, 945, 946, 947, 332, 333, 334, 335, 336, 431, 432, 436, 443, 444, 445,
    642, 651, 652, 654, 655, 656, 657, 812, 813, 814, 815, 822, 823, 824, 825, 832, 833, 931, 932, 933, 934, 935, 936,
    937, 941, 125, 126, 143, 144, 145, 146, 153, 154, 155, 156, 222, 223, 224, 225, 226, 227, 228, 229, 28, 29, 32, 38,
    39, 48, 49, 58, 59, 73, 74, 75, 76, 77, 78, 79, 80, 81,
  ];

  useEffect(() => {
    if (!rooms.includes(parseInt(room))) {
      setInvalidRoom(true);
    } else {
      setInvalidRoom(false);
    }
  }, [room]);

  const [colors, setColors] = useState(Theme.Purple);

  // const qualities = ["low", "standard", "high", "best"];

  // const [quality, setQuality] = useState(0);

  const download = () => {
    if (invalidRoom) {
      return;
    }

    const requestColors = {
      bg: colors.bg,
      t1: colors.t1,
      t2: colors.t2,
      c1: colors.c1,
      c2: colors.c2,
      c3: colors.c3,
      c4: colors.c4,
    };

    const imgUrl = `/api/hello?room=${room}&colorScheme=${JSON.stringify(requestColors)}`;
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = `${room}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      <Head>
        <title>ระบบจัดตารางเรียน 2/2021</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={"flex justify-center items-center px-4 w-full min-h-screen " + bgColor}>
        <div className="font-ui py-10 px-12 rounded-xl shadow-lg space-y-9 sm:space-y-12 bg-white max-w-[500px]">
          <div>
            <h1 className="text-xl sm:text-2xl font-medium text-gray-800 mb-1">ระบบจัดการตารางเรียน 2/2021</h1>
            <p className="text-sm text-gray-400 leading-5 mt-3">
              ระบบนี้เป็นระบบสำหรับดาวน์โหลดตารางเรียนที่ทาง กช.
              <br />
              จัดทำขึ้น ไม่ได้มีความเกี่ยวข้องกับทางโรงเรียนแต่อย่างใด
              <br />
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-gray-600 font-medium text-xl sm:text-2xl">ใส่เลขห้องเรียน</h2>
            <div className="flex sm:flex-row flex-col items-start sm:items-center">
              <div className="relative w-48">
                <input
                  onChange={(e) => {
                    if (e.target.value.length > 3) return;
                    setRoom(e.target.value);
                  }}
                  value={room}
                  placeholder="เลขห้อง"
                  className={classnames(
                    "border border-gray-300 rounded-md pl-4 py-3 w-full text-gray-500 text-xl",
                    invalidRoom ? "border-red-400" : " border-green-400"
                  )}
                />
                {
                  <span className={`${invalidRoom ? "text-red-400" : "text-green-300"} text-xs mt-2`}>
                    {invalidRoom ? "ไม่พบเลขห้องดังกล่าว" : "สำเร็จ"}
                  </span>
                }
              </div>
              {/*
              <div className="flex items-center">
                <h1 className="text-gray-600 font-medium text-lg mr-2">ความชัด:</h1>
                <div
                  onClick={() => {
                    setQualityPanel((prev) => !prev);
                  }}
                  className="flex relative items-center cursor-pointer"
                >
                  <PencilIcon className="w-4 h-4 text-blue-400 mb-1" />
                  <span className="text-blue-400">ปกติ</span>
                  {qualityPanel && (
                    <>
                      <div style={{ position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px" }} />
                      <div className="absolute top-7 bg-white w-[56px] rounded-lg shadow-lg">
                        <h2 className="text-gray-800 cursor-pointer text-sm text-center rounded-t-lg pt-1 px-2 hover:bg-gray-100">
                          ต่ำ
                        </h2>
                        <h2 className="text-gray-800 cursor-pointer text-sm text-center bg-blue-50 py-0.5 px-2">
                          ปกติ
                        </h2>
                        <h2 className="text-gray-800 cursor-pointer text-sm text-center py-0.5 px-2 hover:bg-gray-100">
                          สูง
                        </h2>
                        <h2 className="text-gray-800 cursor-pointer text-sm text-center pb-1 px-2 hover:bg-gray-100">
                          สูงมาก
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              </div>
              */}
            </div>
          </div>
          <div>
            <Preview rawTheme={colors} />
          </div>
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-gray-600 font-medium text-xl sm:text-2xl">ปรับแต่งตารางเรียน</h2>
            <div className="flex items-start sm:items-center flex-col sm:flex-row">
              <div className="flex items-center">
                <h3 className="text-gray-600 font-medium text-lg mr-2">ชุดสี: </h3>
                <div className="flex justify-center space-x-1 mr-4">
                  <ColorPicker
                    onChange={(c) => {
                      setColors((prev) => {
                        return {...prev, bg: c};
                      });
                    }}
                    defaultColor={colors.bg}
                  />
                  <ColorPicker
                    onChange={(c) => {
                      setColors((prev) => {
                        return {...prev, t1: c};
                      });
                    }}
                    defaultColor={colors.t1}
                  />
                  <ColorPicker
                    onChange={(c) => {
                      setColors((prev) => {
                        return {...prev, t2: c};
                      });
                    }}
                    defaultColor={colors.t2}
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-1 ml-[46px] mt-2 sm:ml-0 sm:mt-0">
                <ColorPicker
                  onChange={(c) => {
                    setColors((prev) => {
                      return {...prev, c1: c};
                    });
                  }}
                  defaultColor={colors.c1}
                />
                <ColorPicker
                  onChange={(c) => {
                    setColors((prev) => {
                      return {...prev, c2: c};
                    });
                  }}
                  defaultColor={colors.c2}
                />
                <ColorPicker
                  onChange={(c) => {
                    setColors((prev) => {
                      return {...prev, c3: c};
                    });
                  }}
                  defaultColor={colors.c3}
                />
                <ColorPicker
                  onChange={(c) => {
                    setColors((prev) => {
                      return {...prev, c4: c};
                    });
                  }}
                  defaultColor={colors.c4}
                />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="flex relative w-[200px] h-[44px]">
                <div className="flex border border-gray-300 w-full rounded-xl">
                  <div className="flex items-center justify-center w-8/12">
                    <span className="text-gray-600 mt-1">{colors.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setPreset((prev) => !prev);
                    }}
                    className="flex items-center justify-center w-4/12 border-l border-gray-300 cursor-pointer hover:bg-gray-100 rounded-r-xl"
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                {preset && (
                  <>
                    <div
                      style={{ position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px" }}
                      onClick={() => {
                        setPreset(false);
                      }}
                    />
                    <div className="absolute top-12 bg-white w-full rounded-lg shadow-lg px-6 py-4 space-y-2">
                      <div className="border-b border-gray-300 py-2">
                        <h1 className="mb-1.5">ชุดสี</h1>
                        {Object.values(Theme).map((cols) => (
                          <h2
                            onClick={() => {
                              setColors(cols);
                            }}
                            className="text-gray-400 mb-1 cursor-pointer"
                            key={cols.name}
                          >
                            {cols.name}
                          </h2>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={download}
              className="bg-blue-500 float-right text-white rounded-xl px-6 py-2.5 w-full sm:w-max"
            >
              <span>สร้างตารางเรียน</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
