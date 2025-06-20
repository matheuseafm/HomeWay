    'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
    {
        label: 'PUCPR',
        icon: GiCastle,
        description: 'Esta propriedade é perto da praia!',
    },
    {
        label: 'UFPR',
        icon: GiCastle,
        description: 'Esta propriedade tem moinhos de vento!',
    },
    {
        label: 'Positivo',
        icon: GiCastle,
        description: 'Esta propriedade é moderna!'
    },
    {
        label: 'Harvard',
        icon: GiCastle,
        description: 'Esta propriedade é no campo!'
    },
    {
        label: 'MIT',
        icon: GiCastle,
        description: 'Esta propriedade tem uma bela piscina!'
    },
    {
        label: 'Oxford',
        icon: GiCastle,
        description: 'Esta propriedade fica em uma ilha!'
    },
    {
        label: 'Cambridge',
        icon: GiCastle,
        description: 'Esta propriedade é perto de um lago!'
    },
    {
        label: 'Stanford',
        icon: GiCastle,
        description: 'Esta propriedade tem atividades de esqui!'
    },
    {
        label: 'USP',
        icon: GiCastle,
        description: 'Esta propriedade é um castelo antigo!'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div
                className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
            >
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        selected={category === item.label}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;