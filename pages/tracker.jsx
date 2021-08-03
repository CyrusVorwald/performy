import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Head from "next/head";

const transactions = [
    {
        address: 'hx27c838faa8048c5cc7ea67abe172dbfceca46eba',
        tx_hash: '0xf0610f76ff396992739b8995f0db579a2d09a0bffecc001c8966c4e4caab273c',
        block: 20235656,
        age: 1627854933,
    },
    {
        address: 'hx27c838faa8048c5cc7ea67abe172dbfceca46eba',
        tx_hash: '0xf714bc854d5c143c1cc3a9b2ae34ada843946996419bca6e9d3ec191bff223b5',
        block: 20235656,
        age: 1627854933,
    },
]

// export async function getStaticProps() {
//     const res = await fetch('')
//     const data = await res.json()
//     return {
//         props: {transactions: data},
//         revalidate: 10
//     }
// }

export default function Tracker() {
    return (
        <div className={"min-h-screen bg-black"}>
            <Head>
                <title>Performy Tracker</title>
                <link rel="icon" href="/icx_o.png"/>
            </Head>
            <NavBar/>
            <div className="flex flex-col xl:items-center min-h-3/5 py-2 overflow-x-hidden">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-dark_blue_icx sm:rounded-lg">
                            <table className="min-w-full divide-y divide-dark_blue_icx">
                                <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-dark_blue_icx uppercase tracking-wider"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-dark_blue_icx uppercase tracking-wider"
                                    >
                                        TxHash
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-dark_blue_icx uppercase tracking-wider"
                                    >
                                        Block
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-s font-medium text-dark_blue_icx uppercase tracking-wider"
                                    >
                                        Age
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray_bar_icx">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.address}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="ml-4">
                                                <a className="text-sm text-white"
                                                   href={`https://bicon.tracker.solidwallet.io/address/${transaction.address}`}
                                                   target="_blank" rel="noopener noreferrer">{transaction.address}</a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a className="text-sm text-white"
                                               href={`https://bicon.tracker.solidwallet.io/transaction/${transaction.tx_hash}`}
                                               target="_blank" rel="noopener noreferrer">{transaction.tx_hash}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a className="text-sm text-white"
                                               href={`https://bicon.tracker.solidwallet.io/block/${transaction.block}`}
                                               target="_blank" rel="noopener noreferrer">{transaction.block}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.age}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
