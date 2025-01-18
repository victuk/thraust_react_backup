import OtherPageHeader from "../components/OtherPageHeader";
import DefaultLayout from "../components/layout/DefaultLayout";
import Marquee from "react-fast-marquee";

export default function AboutUs() {
  return (
    <DefaultLayout>
      <OtherPageHeader header="About Us" />

      <section id="about" className="py-10 px-10 xl:px-[140px]">
        <div className="container">
          <div className="flex gap-10 items-center">
            <div className="xl:w-[60%]">
              <div className="font-bold text-[40px] text-primary mb-8 text-center xl:text-left">
                Brief introduction to Harltze...
              </div>
              <div className="flex flex-col gap-4 text-center xl:text-left">
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Saepe magnam inventore, dicta vel, expedita repellat provident
                  corporis, ea cum exercitationem voluptate nisi animi adipisci
                  ipsam ratione voluptas aspernatur. Alias, magnam?
                </div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Saepe magnam inventore, dicta vel, expedita repellat provident
                  corporis, ea cum exercitationem voluptate nisi animi adipisci
                  ipsam ratione voluptas aspernatur. Alias, magnam?
                </div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Saepe magnam inventore, dicta vel, expedita repellat provident
                  corporis, ea cum exercitationem voluptate nisi animi adipisci
                  ipsam ratione voluptas aspernatur. Alias, magnam?
                </div>
              </div>
              {/* <button className="read-more">Read More</button> */}
            </div>
            <div className="hidden xl:block xl:w-[40%]">
              <img
                src="about.svg"
                alt="About Image"
                className="h-[450px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-10 xl:px-[140px]">
        <div className="text-center font-bold text-[35px] text-primary mb-10">
          Meet Our Team
        </div>
        <div className="flex flex-col xl:flex-row text-center items-center justify-center gap-20">
          <div className="team-member">
            <img
              src="image1.jpg"
              className="h-[250px] w-[250px] rounded-full border border-4 border-dashed border-primary"
              alt="John Doe"
            />
            <div className="font-bold text-primary text-[25px]">John Doe</div>
            <p className="text-[14px] text-[#888]">CEO and Founder</p>
          </div>
          <div className="team-member">
            <img
              src="image2.jpg"
              className="h-[250px] w-[250px] rounded-full border border-4 border-dashed border-primary"
              alt="Jane Smith"
            />
            <div className="font-bold text-primary text-[25px]">Jane Smith</div>
            <p className="text-[14px] text-[#888]">CTO Co-Founder</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-10 xl:px-[140px]">
        <div className="text-center font-bold text-[35px] text-primary mb-10">
          What Our Clients Say
        </div>
        <Marquee pauseOnHover={true}>
          <div className="bg-[#ccc] p-4 rounded-xl mx-20">
            <blockquote>
              <p>Harltze has been instrumental in our business growth...</p>
              <cite>— Client Name</cite>
            </blockquote>
          </div>
          
          <div className="bg-[#ccc] p-4 rounded-xl mx-20">
            <blockquote>
              <p>
              Harltze's innovative solutions have exceeded our expectations...
              </p>
              <cite>— Client Name</cite>
            </blockquote>
          </div>
        </Marquee>
      </section>
    </DefaultLayout>
  );
}
