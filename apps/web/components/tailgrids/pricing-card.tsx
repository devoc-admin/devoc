export const PricingCard = ({
  children,
  description,
  price,
  type,
  subscription,
  buttonText,
  active,
}: {
  children: React.ReactNode;
  description: string;
  price: string;
  type: string;
  subscription: string;
  buttonText: string;
  active: boolean;
}) => (
  <>
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] border-2 border-stroke bg-white px-8 py-10 shadow-pricing sm:p-12 lg:px-6 lg:py-10 xl:p-[50px] dark:border-dark-3 dark:bg-dark-2">
        <span className="mb-3 block font-semibold text-lg text-primary">
          {type}
        </span>
        <h2 className="mb-5 font-bold text-[42px] text-dark dark:text-white">
          {price}
          <span className="font-medium text-base text-body-color dark:text-dark-6">
            / {subscription}
          </span>
        </h2>
        <p className="mb-8 border-stroke border-b pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
          {description}
        </p>
        <div className="mb-9 flex flex-col gap-3.5">{children}</div>
        <a
          className={` ${
            active
              ? "block w-full rounded-md border border-primary bg-primary p-3 text-center font-medium text-base text-white transition hover:bg-opacity-90"
              : "block w-full rounded-md border border-stroke bg-transparent p-3 text-center font-medium text-base text-primary transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3"
          } `}
          href="/#"
        >
          {buttonText}
        </a>
        <div>
          <span className="absolute top-7 right-0 z-[-1]">
            <svg
              fill="none"
              height={172}
              viewBox="0 0 77 172"
              width={77}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx={86} cy={86} fill="url(#paint0_linear)" r={86} />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear"
                  x1={86}
                  x2={86}
                  y1={0}
                  y2={172}
                >
                  <stop stopColor="#3056D3" stopOpacity="0.09" />
                  <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute top-4 right-4 z-[-1]">
            <svg
              fill="none"
              height={89}
              viewBox="0 0 41 89"
              width={41}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="38.9138"
                cy="87.4849"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 87.4849)"
              />
              <circle
                cx="38.9138"
                cy="74.9871"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 74.9871)"
              />
              <circle
                cx="38.9138"
                cy="62.4892"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 62.4892)"
              />
              <circle
                cx="38.9138"
                cy="38.3457"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 38.3457)"
              />
              <circle
                cx="38.9138"
                cy="13.634"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 13.634)"
              />
              <circle
                cx="38.9138"
                cy="50.2754"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 50.2754)"
              />
              <circle
                cx="38.9138"
                cy="26.1319"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 26.1319)"
              />
              <circle
                cx="38.9138"
                cy="1.42021"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 38.9138 1.42021)"
              />
              <circle
                cx="26.4157"
                cy="87.4849"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 87.4849)"
              />
              <circle
                cx="26.4157"
                cy="74.9871"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 74.9871)"
              />
              <circle
                cx="26.4157"
                cy="62.4892"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 62.4892)"
              />
              <circle
                cx="26.4157"
                cy="38.3457"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 38.3457)"
              />
              <circle
                cx="26.4157"
                cy="13.634"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 13.634)"
              />
              <circle
                cx="26.4157"
                cy="50.2754"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 50.2754)"
              />
              <circle
                cx="26.4157"
                cy="26.1319"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 26.1319)"
              />
              <circle
                cx="26.4157"
                cy="1.4202"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 26.4157 1.4202)"
              />
              <circle
                cx="13.9177"
                cy="87.4849"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 87.4849)"
              />
              <circle
                cx="13.9177"
                cy="74.9871"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 74.9871)"
              />
              <circle
                cx="13.9177"
                cy="62.4892"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 62.4892)"
              />
              <circle
                cx="13.9177"
                cy="38.3457"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 38.3457)"
              />
              <circle
                cx="13.9177"
                cy="13.634"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 13.634)"
              />
              <circle
                cx="13.9177"
                cy="50.2754"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 50.2754)"
              />
              <circle
                cx="13.9177"
                cy="26.1319"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 26.1319)"
              />
              <circle
                cx="13.9177"
                cy="1.42019"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 13.9177 1.42019)"
              />
              <circle
                cx="1.41963"
                cy="87.4849"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 87.4849)"
              />
              <circle
                cx="1.41963"
                cy="74.9871"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 74.9871)"
              />
              <circle
                cx="1.41963"
                cy="62.4892"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 62.4892)"
              />
              <circle
                cx="1.41963"
                cy="38.3457"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 38.3457)"
              />
              <circle
                cx="1.41963"
                cy="13.634"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 13.634)"
              />
              <circle
                cx="1.41963"
                cy="50.2754"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 50.2754)"
              />
              <circle
                cx="1.41963"
                cy="26.1319"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 26.1319)"
              />
              <circle
                cx="1.41963"
                cy="1.4202"
                fill="#3056D3"
                r="1.42021"
                transform="rotate(180 1.41963 1.4202)"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </>
);

export const List = ({ children }: {
  children: React.ReactNode;
}) => (
  <p className="text-base text-body-color dark:text-dark-6">{children}</p>
);
