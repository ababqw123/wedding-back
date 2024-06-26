import Appbar from "@/public/companent/Appbar";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditWedding({
  wedding,
  company,
}: {
  wedding: {
    _id: string;
    date: Dayjs;
    time: string;
    company: string;
    hall: string;
    people: {
      groomName: string;
      groomFather: string;
      groomMother: string;
      brideName: string;
      brideFather: string;
      brideMother: string;
    };
  };
  company: Array<{
    _id: string;
    name: string;
    addr: string;
    phone: string;
    hallList: Array<{
      _id: string;
      name: string;
      floor: number;
      size: string;
    }>;
  }>;
}) {
  const today = new Date();
  const router = useRouter();
  const [data, setData] = useState<{
    _id: string;
    date: Dayjs;
    time: string;
    company: string;
    hall: string;
    people: {
      groomName: string;
      groomFather: string;
      groomMother: string;
      brideName: string;
      brideFather: string;
      brideMother: string;
    };
  }>({
    _id: "",
    date: dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
    time: "",
    company: "",
    hall: "",
    people: {
      groomName: "",
      groomFather: "",
      groomMother: "",
      brideName: "",
      brideFather: "",
      brideMother: "",
    },
  });

  const [companyList, setCompanyList] = useState<
    Array<{
      companyName: string;
      companyId: string;
    }>
  >([]);
  const [halls, setHalls] = useState<
    Array<{
      companyId: string;
      name: string;
      floor: number;
      size: string;
    }>
  >([]);

  useEffect(() => {
    setData({
      _id: wedding._id,
      date: dayjs(wedding.date),
      time: dayjs(wedding.date).format("hh"),
      company: wedding.company,
      hall: wedding.hall,
      people: wedding.people,
    });
  }, [wedding]);

  useEffect(() => {
    if (company != undefined) {
      const list = company.map((it) => {
        return { companyName: it.name, companyId: it._id };
      });
      setCompanyList(list);
    }
  }, [company]);

  useEffect(() => {
    if (companyList.length !== 0) {
      setData((prevState) => ({
        ...prevState,
        company: companyList[0].companyId,
      }));
    }
  }, [companyList]);

  useEffect(() => {
    if (data.company !== "") {
      const hallValue = company.filter((it) => {
        return it._id === data.company;
      });
      const hallList: Array<{
        companyId: string;
        name: string;
        floor: number;
        size: string;
      }> = [];
      const companyId = hallValue[0]._id;
      if (hallValue[0].hallList != null) {
        hallValue[0].hallList.forEach((it) => {
          hallList.push({
            companyId: companyId,
            name: it.name,
            floor: it.floor,
            size: it.size,
          });
        });
        setHalls(hallList);
        setData((prevState) => ({
          ...prevState,
          hall: hallList[0].name,
        }));
      } else {
        setHalls([]);
      }
    }
  }, [company, data.company]);

  return (
    <>
      <Appbar />
      <Grid
        sx={{
          width: 850,
          margin: "0 auto ",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            marginTop: 13,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            결혼식 수정
          </Typography>
        </Grid>
        <Grid
          sx={{
            mt: 2,
            mb: 3,
            width: "100%",
            height: "350",
            display: "flex",
          }}
        >
          <Grid sx={{ borderRight: "1px solid black", width: "50%", textAlign: "center" }}>
            <Grid>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                신랑측
              </Typography>
            </Grid>
            <Grid mt={5}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    이름
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomName}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomName = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid mt={3}>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  가족사항
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    부
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomFather}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomFather = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    모
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomMother}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomMother = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              width: "50%",
              textAlign: "center",
            }}
          >
            <Grid>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                신부측
              </Typography>
            </Grid>
            <Grid mt={5}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    이름
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideName}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideName = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  mt: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  가족사항
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    부
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideFather}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideFather = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    모
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideMother}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideMother = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ width: 400, margin: "0 auto" }}>
          <Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 6,
                ml: 5,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>일자</Typography>
              </Grid>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="결혼식 일자"
                    value={data.date}
                    sx={{ width: 232 }}
                    onChange={(newValue) => {
                      setData((prevState) => ({
                        ...prevState,
                        date: newValue || dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
                      }));
                    }}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 5,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>시간</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">시간</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.time}
                    label="time"
                    onChange={(event) => {
                      setData((prevState) => ({
                        ...prevState,
                        time: event.target.value as string,
                      }));
                    }}
                  >
                    <MenuItem value={11}>11:00</MenuItem>
                    <MenuItem value={14}>14:00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 3,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>예식장</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">예식장</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.company}
                    label="company"
                    sx={{ textAlign: "left" }}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        company: e.target.value as string,
                      }));
                    }}
                  >
                    {companyList.map((it, i) => (
                      <MenuItem key={i} value={it.companyId}>
                        {it.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 7,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography> 홀</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">홀</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.hall}
                    label="hall"
                    onChange={(event) => {
                      setData((prevState) => ({
                        ...prevState,
                        hall: event.target.value as string,
                      }));
                    }}
                  >
                    {halls.map((it, i) => (
                      <MenuItem key={i} value={it.name}>
                        {it.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            mt: 2,
            mb: 5,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={async () => {
              const date = new Date(data.date.toDate());
              date.setHours(Number(data.time));
              setData((prevState) => ({
                ...prevState,
                date: dayjs(date),
              }));
              const result = await (
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/editWedding`, {
                  method: "PUT",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
              ).json();
              router.push(`/admin/wedding`);
            }}
          >
            수정하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   try {
//     const wedding = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findAllWedding`)).json();
//     const possibleTokenValues: Array<string> = wedding.map((it: any) => {
//       return it._id;
//     }); // 가능한 토큰 값들로 대체해야 합니다.

//     const paths = possibleTokenValues.map((token) => ({
//       params: { token },
//     }));

//     return {
//       paths,
//       fallback: false, // fallback이 false이면 존재하지 않는 경로로의 접근은 404 페이지를 반환합니다.
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const token = (params?.token as string) || ("" as string);
  try {
    const company: Array<{
      _id: string;
      name: string;
      addr: string;
      phone: string;
      hallList: Array<{
        _id: string;
        name: string;
        floor: number;
        size: string;
      }>;
    }> = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/getAllCompany`)).json();
    const wedding: {
      _id: string;
      date: Dayjs;
      time: string;
      company: string;
      hall: string;
      people: {
        groomName: string;
        groomFather: string;
        groomMother: string;
        brideName: string;
        brideFather: string;
        brideMother: string;
      };
    } = await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findWedding`, {
        method: "POST",
        body: JSON.stringify({ id: token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return {
      props: {
        wedding,
        company,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: {
        value: null,
      },
    };
  }
};
